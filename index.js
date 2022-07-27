const express = require('express')
const mongoose = require('mongoose')
const UserModel = require('./models/Users.js')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000
const uri = 'mongodb+srv://piyush:onetwo@cluster0.sdaqk.mongodb.net/?retryWrites=true&w=majority'

// connect to db
async function connectDB() {
    try {
        const res = await mongoose.connect(uri)
        if (res) {
            console.log(`connected to db`)
        }
    } catch (error) {
        console.log(error)
    }
}
connectDB()

// api requests
// get requests
app.get('/getUsers', (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err)

        } else {
            res.json(result)
        }
    })
})

// api post
app.post('/createUser', async (req, res) => {
    const user = req.body
    const newUser = new UserModel(user)
    await newUser.save()

    res.json(user)
})

// listening
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})