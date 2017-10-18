const model = require('../model/language')

const getLanguages = (req, res, next) => {
  return model.getLanguages()
}

module.exports = {
  getLanguages
}