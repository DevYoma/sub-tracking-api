import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send({
        title: "GET all subscriptions",
    })
})

subscriptionRouter.get('/:id', (req, res) => {
    res.send({
        title: `GET subscription with id ${req.params.id}`,
    })
})

subscriptionRouter.post('/', (req, res) => {
    res.send({
        title: "CREATE new subscription",
    })
})

subscriptionRouter.put('/:id', (req, res) => {
    res.send({
        title: `UPDATE subscription with id ${req.params.id}`,
    })
})

subscriptionRouter.delete('/:id', (req, res) => {
    res.send({
        title: `DELETE subscription with id ${req.params.id}`,
    })
})

// GET all subscriptions for user with id(user can have multiple subscriptions)
subscriptionRouter.get('/user/:id', (req, res) => {
    res.send({
        title: `GET all subscriptions for user with id ${req.params.id}`,
    })
});

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({
        title: `CANCEL subscription with id ${req.params.id}`,
    })
})

subscriptionRouter.get('/upcoming-renewal', (req, res) => {
    res.send({
        title: `GET all subscriptions with upcoming renewal`,
    })
})

export default subscriptionRouter;