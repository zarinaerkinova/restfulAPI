const Joi = require('joi')
const { Router } = require('express')
const router = Router()

const users = [
    { name: 'Tom', age: 12, id: 1 },
    { name: 'Harry', age: 23, id: 2 },
    { name: 'Jack', age: 34, id: 3 },
]

router.get('/', (req, res) => {
    res.send(users)
})

router.get('/:id', (req, res) => {
    const user = users.find(val => val.id === +req.params.id)
    if(user === undefined) {
        res.send('There is no user with that id')
    }
    res.send(user)
})

router.post('/user', (req, res) => {
    const user = {
        name: req.body.name,
        age: req.body.age,
        id: users.length + 1
    }

    const schema = Joi.object({
        name: Joi.string().trim().required().min(3),
        age: Joi.number().required().min(6).max(200)
    })

    const validation = schema.validate(req.body)

    if (validation.error) {
        return res.send(validation.error.message)
    }

    users.push(user)
    res.send('User created')
})

router.put('/update/:id', (req, res) => {
    const user = users.find(val => val.id === +req.params.id)
    if(user === undefined) {
        res.send('There is no user with that id')
    }

    const schema = Joi.object({
        name: Joi.string().trim().required().min(3),
        age: Joi.number().required().min(6).max(200)
    })

    const validation = schema.validate(req.body)

    if (validation.error) {
        return res.send(validation.error.message)
    }

    user.name = req.body.name
    user.age = req.body.age
    res.send('User updated')
})

router.delete('/delete/:id', (req, res) => {
    const user = users.find(val => val.id === +req.params.id)
    const ind = users.indexOf(user)
    if(ind === -1) {
        return res.send('There is no user with that id')
    }
    users.splice(ind, 1)
    res.send('User deleted')
})

module.exports = router
