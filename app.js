import express from "express";

import { PORT } from "./config/env.js";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";

const app = express();

app.use('/api/v1/auth', authRouter); // api/v1/auth/sign-up
app.use('/api/v1/users', userRouter); // api/v1/users
app.use('/api/v1/subscriptions', subscriptionRouter); // api/v1/subscriptions

app.get('/', (req, res) => {
    res.send('Welcome to the Subscription Tracker API');
})

app.listen(PORT, () => {
    console.log(`Subscription Tracker is running on http://localhost:${PORT}`);
})

export default app;