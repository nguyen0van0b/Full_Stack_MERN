require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@first-project.fwmcq.mongodb.net/first-project?retryWrites=true&w=majority`,{
            // useCreaterIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology:true,
            // useFindAndModify:false
        })
        console.log('MongoDB connected')
    } catch (error){
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()
// read data json
app.use(express.json())
app.use(cors())
// app.get('/',(req,res)=> res.send('heloooooooo'))

app.use('/api/auth',authRouter)
app.use('/api/posts',postRouter)

const POST = 5000

app.listen(POST,() => console.log(`Server started on port ${POST}`))