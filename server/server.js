const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./configuration/config')
const loginRoute = require('./routes/loginRouteMgnt')
const dataRoute = require('./routes/dataRouterMgnt')

const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))

app.use('/logins', loginRoute)
app.use('/data', dataRoute)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})