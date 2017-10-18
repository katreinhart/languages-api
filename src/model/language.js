const languages = []
const uuid = require('uuid/v4')

function getLanguages() {
  return languages
}

function getOneLanguage(id) {
  const language = languages.find(lang=> lang.id === id)
  if(!language) {
    return { error: { status: 404, message: `Language ${id} not found` }}
  } else {
    return language
  }
}

function addLanguage(body) {
  const { 
    name, 
    use, 
    created, 
    createdBy, 
    basedOn, 
    rank 
  } = body

  const id = uuid()

  const newLanguage = {
    id, 
    name, 
    use, 
    created, 
    createdBy,
    basedOn, 
    rank
  }

  const errors = []
  if(!name) errors.push('Name is required')
  if(!use) errors.push('Use is required') 
  if(!created) errors.push('Created year is required')
  if(!createdBy) errors.push('Created By is required')
  if(!basedOn) errors.push('Based on information required')
  if(!rank) errors.push('Global rank is required')

  if(errors.length > 0) {
    return { error: { status: 400, message: 'There were errors', errors: errors }}
  } else {
    languages.push(newLanguage)
    return newLanguage
  }
}

function updateLanguage(id, body) {
  const language = languages.find(lang => lang.id === id)
  if(!language) {
    return { error: { status: 404, message: `Language ${id} not found` }}
  } else {
    const {
      name,
      use,
      created,
      createdBy, 
      basedOn,
      rank
    } = body

    const errors = []

    if(!name)      errors.push('Name is required')
    if(!use)       errors.push('Use is required')
    if(!created)   errors.push('Created year is required')
    if(!createdBy) errors.push('Created By is required')
    if(!basedOn)   errors.push('Based on information required')
    if(!rank)      errors.push('Global rank is required')

    language.name       = name
    language.use        = use
    language.created    = created
    language.createdBy  = createdBy
    language.basedOn    = basedOn
    language.rank       = rank

    if(errors.length > 0) {
      return { error: { status: 400, message: 'There were errors', errors: errors }}
    } else {
      return language
    }
  }
}

function deleteLanguage(id) {
  const language = languages.find(lang=> lang.id === id)
  if(!language) {
    return { error: { status: 404, message: `Language ${id} not found` }}
  } else {
    const index = languages.indexOf(language)
    languages.splice(index, 1)
    return language
  }
}

module.exports = {
  getLanguages,
  getOneLanguage,
  addLanguage,
  updateLanguage,
  deleteLanguage
}