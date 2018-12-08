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


module.exports = router;