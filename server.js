const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
path = require('path')

require('dotenv').config()

//Connect to Mongo DB Atlas
mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

//Check pending connection
const db = mongoose.connection
db.on('error', () => console.log("Couldn't connect to MongoDB"))
db.once('open', () => console.log('Connection to DB succsessful!'))

//Load express
const app = express()
const port = process.env.PORT || 5000

//Load express json parser and CORS
app.use(express.json())
app.use(cors())

//Import routes
const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
const taskRoute = require('./routes/task.route')

//Mount routes on express app
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/task', taskRoute)

//Serve  Static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static foler path
    app.use(express.static('client/build'))
    //Load static html using above path for any request but the ones to the API routes
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})
