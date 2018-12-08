const express = require('express');
const router = express.Router();
const actionDb = require('../data/helpers/actionModel');

//GET


router.get('/', (req, res) => {
    actionDb.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "Could not fetch the actions."
            })
        })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    actionDb.get(id)
        .then(action => {
            console.log('get action by id', action)
            if(action) {
                res.json(action)
            } else {
                res
                .status(404)
                .json({
                    message: "That action ID does not exist."
                })
            }
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "Failed to fetch that action."
            })
        })
});



module.exports = router;