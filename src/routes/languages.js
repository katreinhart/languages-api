const express = require('express')
const router = express.Router()
const ctrl = require('../controller/languages')

router.get('/', ctrl.getAllLanguages)
router.post('/', ctrl.addLanguage)
router.get('/:id', ctrl.getOneLanguage)

module.exports = router