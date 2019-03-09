const express = require('express')
const actionDB = require('../data/helpers/actionModel')
const router = express.Router()

router.use(express.json())

router.get('/actions', async (req, res) => {
    try {
        const actions = await actionDB.get()
        res.status(200).json(actions)    
    } catch(error) {
        res.status(500).json({ error: "The actions information could not be retrieved."})
    }
})

router.get('/actions/:id', async (req, res) => {
    try {
        const action = await actionDB.get(req.params.id)
        if (action) {
            res.status(200).json(action)
        } else {
            res.status(404).json({ message: "The action with the specific id does not exist."})
        }
    } catch(error) {
        res.status(500).json({ error: "The action information could not be found."})
    }
})

router.post('/actions', async (req, res) => {
    try {
        const action = await actionDB.insert(req.body)
        if (action) {
            res.status(200).json(action)
        } else {
            res.status(404).json({ message: "The action with the specific id does not exist."})
        }
    } catch(error) {
        res.status(500).json({ error: "The action information could not be posted."})
    }
})

router.delete('/actions/:id', async (req, res) => {
    try {
        const action = await actionDB.remove(req.params.id)
        if (action) {
            res.status(200).json(action)
        } else{
            res.status(404).json({ message: "The action with the specicf id does not exist."})
        }
    } catch(error) {
        res.status(500).json({ error: "The action could not be removed."})
    }
})

router.put('/actions/:id', async (req, res) => {
    try {
        const { project_id, description, notes } = req.body
        if (project_id, description, notes) {
            const action = await actionDB.update(req.params.id, req.body)
            if (action) {
                res.status(200).json(action)
            } else {
                res.status(404).json({ message: "The action with the specific id does not exist."})
            } 
        } else {
            res.status(400).json({ message: "Please provide the project_id, description, and notes."})
        }
    } catch(error) {
        res.status(500).json({ error: "The action information could not be updated."})
    }
})

module.exports = router