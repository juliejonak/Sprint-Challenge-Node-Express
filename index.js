const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const actionDb = require('./data/helpers/actionModel');
const projectDb = require('./data/helpers/projectModel');

const actionRouter = require('./routes/action_routes');

const server = express();

server.use(
    express.json(),
    helmet(),
    logger('dev'),
    cors()
);

const PORT = process.env.PORT || 4310;


server.get('/projects', (req, res) => {
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

server.use('/actions', actionRouter);




server.listen(PORT, ()=>{
    console.log("It's aliiiiive!");
})