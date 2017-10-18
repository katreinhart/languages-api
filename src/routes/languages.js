const express = require('express')
const router = express.Router()
const ctrl = require('../controller/languages')

router.get('/', ctrl.getLanguages)

module.exports = router