const express = require('express')
const router = express.Router()
const ctrl = require('../controller/languages')

router.get('/', ctrl.getAllLanguages)
router.post('/', ctrl.addLanguage)
router.get('/:id', ctrl.getOneLanguage)
router.put('/:id', ctrl.updateLanguage)
router.delete('/:id', ctrl.deleteLanguage)

module.exports = router