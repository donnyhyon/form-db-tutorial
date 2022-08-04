const express = require('express')
const app = express()
const port = process.env.port || 3000
const mongoose = require('mongoose')
const routes = require('../routes/users')
const path = require('path')

require('dotenv').config()

const uri = process.env.ATLAS_URI

mongoose.connect(uri)    
const db = mongoose.connection

app.use(express.json())

app.listen(port, () => {
    console.log(`Sever listening on port: ${port}`)
})

app.use(express.static(path.join(__dirname, '../public')))
app.use('/api', routes)
    
db.on('error', (error) => {
    console.log(error)
})

db.once('connected',() => {
    console.log('Database Connected')
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/index.html'))
})