const model = require('../model/language')

const getAllLanguages = (req, res, next) => {
  const response = model.getLanguages()
  res.status(200).json({ data: response })
}

const getOneLanguage = (req, res, next) => {
  const id = req.params.id
  const response = model.getOneLanguage(id)
  if(response.error) {
    const error = response.error
    next({ error })
  } else {
    res.status(200).json({ data: response })
  }
}

const addLanguage = (req, res, next) => {
  const response = model.addLanguage(req.body)
  if(response.error) {
    const error = response.error
    next({ error })
  } else {
    res.status(200).json({ data: response.data })
  }
}

module.exports = {
  getAllLanguages,
  getOneLanguage,
  addLanguage
}