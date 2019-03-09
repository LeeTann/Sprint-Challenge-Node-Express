const express = require('express')
const actionDB = require('../data/helpers/actionModel')
const router = express.Router()

router.use(express.json())



module.exports = router