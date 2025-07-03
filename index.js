//MODELS (SCHEMA AND MODELS); VIEWS(WHAT IS DISPLAYED TO THE USER i.e. YOUR JSX )
// CONTROLLER (LOGIC OR FUNCTIONS); ROUTES
const ejs = require('ejs')
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const userModel = require('./Models/user.model')
const userRouter = require('./Routes/user.route')



app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use('/user', userRouter)
const mongoose = require('mongoose')

let allUsers = []




let uri = process.env.MONGO_DB_URI














const connect = async () => {
  try {
    const connected = await mongoose.connect(uri)
    if (connected) {
      console.log('database connected successfully');

    }
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err, 'could not connect to server');

      }
      else (
        `server is live on PORT ${3000}`
      )
    })

  } catch (err) {
    console.log('database could not connect', err);

  }
}
connect()

