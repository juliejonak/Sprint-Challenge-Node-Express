const express = require('express');
const router = express.Router();
const projectDb = require('../data/helpers/projectModel');

//GET

router.get('/', (req, res) => {
    projectDb.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "Could not fetch the projects."
            })
        })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    projectDb.get(id)
        .then(project => {
            res.json(project);
        })
        .catch(err => {
            res
            .status(404)
            .json({
                message: "That project ID does not exist."
            })
        })
});

//POST

router.post('/', (req, res) => {
    const project = req.body;
    //if project.name and project.description
    if (project.name && project.description) {
        projectDb.insert(project)
            .then(newProject => {
                res.json(newProject)
            })
            .catch(err => {
                res
                .status(500)
                .json({
                    message: "Error adding this new project."
                })
            })
    } else if (project.name) {
        res
        .status(400)
        .json({
            message: "New projects need a description."
        })
    } else if (project.description) {
        res
        .status(400)
        .json({
            message: "New projects need a name."
        })
    } else {
        res
        .status(400)
        .json({
            message: "New projects need both a name and description."
        })
    }
});


module.exports = router;