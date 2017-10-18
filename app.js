const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
if(process.env.NODE_ENV === 'development') app.use(morgan('dev'))

const languagesRoutes = require('./src/routes/languages')
app.use('/languages', languagesRoutes)

app.use((err, req, res, next) => {

})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)