const express = require('express');
const router = express.Router();
const actionDb = require('../data/helpers/actionModel');
const projectDb = require('../data/helpers/projectModel');

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
            res.json(action)
        })
        .catch(err => {
            res
            .status(404)
            .json({
                message: "That action ID does not exist"
            })
        })
});

//POST

router.post('/', (req, res) => {
    const action = req.body;
//still adds invalid project ids and with invalid IDs shows Unhandled rejection error - cannot set headers after they are sent to the client
    if(action.project_id && action.description && action.notes){
        projectDb.get(action.project_id)
            .then(
                actionDb.insert(action)
                    .then(newAction => {
                        console.log("new action:", newAction)
                        res.json(newAction)
                    })
                    .catch(err => {
                        res
                        .status(500)
                        .json({
                            message: "There was an error addding this new action."
                        })
                    })
            )
            .catch(err=>{
                res
                .status(404)
                .json({
                    message: "That project ID is invalid. Please use a valid one."
                })
            })
    } else if (action.project_id && action.description) {
        res
        .status(400)
        .json({
            message: "New actions require notes."
        })
    } else if (action.project_id && action.notes) {
        res
        .status(400)
        .json({
            message: "New actions require a description."
        })
    } else if (action.description && action.notes) {
        res
        .status(400)
        .json({
            message: "New actions require a valid project ID."
        })
    } else {
        res
        .status(400)
        .json({
            message: "New actions require a project ID, description and notes."
        })
    }

});

//DELETE

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    actionDb.get(id)
        .then(action => {
            const theAction = action;
            actionDb.remove(id)
                .then(count => {
                    if(count){
                        res.json(theAction);
                    }
                })
        })
        .catch(err => {
            res
            .status(404)
            .json({
                message: "That action ID is invalid."
            })
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "This action could not be deleted."
            })
        })
})


module.exports = router;