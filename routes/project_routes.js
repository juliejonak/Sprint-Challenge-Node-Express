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



module.exports = router;