import mongoose from "mongoose";
import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {JWT_SECRET, JWT_EXPIRES_IN} from "../config/env.js";

// Path: /api/v1/auth/sign-up (POST)
export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction(); // we want to perform ATOMIC operations

    try {
        // 1. Create a new user
        const { name, email, password } = req.body;

        // 2. Check if user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser){
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // 2a. If user does not exist, hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create a new user and generate a token
        const newUser = await User.create([{
            name, 
            email, 
            password: hashedPassword
        }], { session })

        // eslint-disable-next-line no-undef
        const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        // n. Commit the transaction
        await session.commitTransaction();

        // 4. Send the response
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token, 
                user: newUser[0]
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

//  Path: /api/v1/auth/sign-in (POST)
export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            const error = new Error('Invalid password');
            error.statusCode = 401; // unauthorized
            throw error;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                token, 
                user
            }
        });

    } catch (error) {
        next(error);
    }
};

//  Path: /api/v1/auth/sign-out (POST)
export const signOut = async (req, res, next) => {};