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

// api delete
app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    // res.send(id)
    try {
        await UserModel.findByIdAndRemove(id).exec()

    } catch (error) {
        console.log(error)
    }
    res.send('deleted')
})

// api update
app.put('/update', async (req, res) => {
    const newName = req.body.newName
    const id = req.body.id

    try {
        await UserModel.findByIdAndUpdate(id, {
            username: newName
        })
    } catch (error) {
        console.log(error)
    }
    res.send('updated')
})

// listening
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})

/**
 * 
 * TO SET UP HEROKU
 * 
 * heroku login
 * heroku create app-name
 * echo "web: node index.js" > Procfile
 * git add .
 * git commit -m "change"
 * git push heroku main
 * 
 * create procfile with utf-8 encoding
 * 
 * in package.json ->
 * add "scripts": {
    "start": "node index.js"
  },

  otherwise heroku will crash
 */