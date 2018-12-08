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



module.exports = router;