// environment variables
const dotenv = require('dotenv');

// Load environment variables from the parent directory's .env file
dotenv.config();
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const mongoIP = process.env.MONGO_IP;
const mongoPort = process.env.MONGO_PORT;

// mongoose setup
const mongoose = require('mongoose')
function connectMongo() {
  mongoose.connect(`mongodb://${user}:${password}@${mongoIP}:${mongoPort}/mydb?authSource=admin`)
    .then(()=>console.log('successfully connected to mongodb'))
    .catch(e=>{
      console.log('error occurred in connecting to db : ', e)
      setTimeout(connectMongo, 5000)
    })
}
connectMongo()


const express = require('express')
const app = express()
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello World'
  })
})

const os = require('os')
app.get('/api/v1', (req,res)=>{
	res.send(`<h1>${os.hostname()} : Hello world</h1>\n`)
})

const postRouter = require('./routes/postRouter')
app.use('/api/v1/post', postRouter)

const authRouter = require('./routes/authRouter')
app.use('/api/v1/auth', authRouter)



app.listen(3000, () => {
  console.log('app is listening on port 3000')
})