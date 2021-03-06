const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const projectRoutes = require('./router/projectRoutes')
const actionRoutes = require('./router/actionRoutes')

const server = express()

server.use(express.json(), logger('dev'), helmet(), cors())
server.use('/api', projectRoutes, actionRoutes)

server.get('/', (req, res) => {
    res.send('Hello from Node and Express Sprint Challenge')
})

server.use(function(req, res) {
res.status(404).send(`Ain't nobody got time for Dat! Please enter the correct URL`)
})

module.exports = server