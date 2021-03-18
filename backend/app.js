
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();

const user = require('./route/user')
const inventory = require('./route/inventory')
const pet = require('./route/pet')

app.use(cors())
  
app.use(bodyParser.urlencoded({extended:false}))

app.use('/api', user)
app.use('/api', inventory)
app.use('/api', pet)
app.listen(5000, () => {
    console.log('running at 5000')
})