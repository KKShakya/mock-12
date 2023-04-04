const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDb } = require('./config/database');
const { userRouter } = require('./routes/user.route');

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.use(cors())

app.use('/user',userRouter)
app.get('/',(req,res)=>{
  res.status(200).send({'msg':"Welcome to grow calculator"});
})

app.listen(port,async (req,res)=>{
  try {
    await connectDb;
    console.log(`server is running on ${port}`)
  } catch (error) {
    
    console.log('error',error.message);
  }
})