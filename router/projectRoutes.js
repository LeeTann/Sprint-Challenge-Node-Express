const express = require('express')
const projectDB = require('../data/helpers/projectModel')
const router = express.Router()

router.use(express.json())

router.get('/projects', async (req, res) => {
    try {
        const projects = await projectDB.get()
        res.status(200).json(projects)
        
    } catch(erorr) {
        res.status(500).json({ error: "The project could not be retrieved."})
    }
})

router.get('/projects/:id', async (req, res) => {
    try {
        const project = await projectDB.get(req.params.id)
        if (project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({ message : "The project with the specific id does not exist"})
        }
    } catch(error) {
        res.status(500).json({ message: "The project information could not be retrieved."})
    }
})

router.post('/projects', async (req, res) => {
    try { 
        const project = await projectDB.insert(req.body)
        if (project) {
            res.status(201).json(project)
        } else {
            res.status(400).json({ message: "Please provide the correct info"})
        }
    } catch(error) {
        res.status(500).json({ error: "There was an error while saving the project to the database."})
    }
})

router.delete('/projects/:id', async (req, res) => {
    const { id } = req. params
    try {
        const project = await projectDB.get(id)
        if (project) {
            await projectDB.remove(id)
            res.json({ removed: project })
        } else {
            res.status(404).json({ message: "The project with the specific id does not exist."})
        }
    } catch(error) {
        res.status(500).json({ error: "The project could not be removed."})
    }
})

router.put('/projects/:id', async (req, res) => {
    try {
        const { name, description } = req.body
        if (name && description) {
            const project = await projectDB.update(req.params.id, req.body)
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({ message: "The project with the specific id does not exist."})
            }
        } else {
            res.status(400).json({ message: "Please provide the correct name and description"})
        }
    } catch(error) {
        res.status(500).json({ message: "The project could not be updated"})
    }
})

router.get('/projects/:id/actions', async (req, res) => {
    try {
        const project = await projectDB.get(req.params.id)
        if (project) {
            const actions = await projectDB.getProjectActions(req.params.id)
            if (project && actions) {
                res.status(200).json(actions)
            } else {
                res.status(404).json({ message: "The project with the specific id does not exist."})
            }
        } else {
            res.status(400).json({ message: "Please provide the correct info for the project"})
        }
    } catch(error) {
        res.status(500).json({ error: "Could not retrieve the project's actions."})
    }
})

module.exports = router