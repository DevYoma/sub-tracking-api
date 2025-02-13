import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send({
        title: "GET all users",
    })
})

userRouter.get('/:id', (req, res) => {
    res.send({
        title: `GET user with id ${req.params.id}`,
    })
})

userRouter.post('/', (req, res) => {
    res.send({
        title: "CREATE new user",
    })
})

userRouter.put('/:id', (req, res) => {
    res.send({
        title: `UPDATE user with id ${req.params.id}`,
    })
})

userRouter.delete('/:id', (req, res) => {
    res.send({
        title: `DELETE user with id ${req.params.id}`,
    })
})

export default userRouter;