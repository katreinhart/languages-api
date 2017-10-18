const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
if(process.env.NODE_ENV === 'development') app.use(morgan('dev'))

const languagesRoutes = require('./src/routes/languages')
app.use('/languages', languagesRoutes)

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' })
})

app.use((err, req, res, next) => {
  const status = err.error.status || 500
  const error = err.error
  res.status(status).json({ error })
})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)

module.exports = app