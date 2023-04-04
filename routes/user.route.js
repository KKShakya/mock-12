const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { userModel } = require('../models/user.model');
const { authenticate } = require('../middlewares/authenticate.middleware');

const userRouter = express.Router();

// userRouter.get('/',(req,res)=>{
//   res.send('welcome abroad')
// })


// reisater user
userRouter.post('/register',async (req,res)=>{
const {name,email,password} = req.body;
try {
  const oldUser = await userModel.find({email});
  if(oldUser.length>0){
    return res.send({'msg': 'User already registered'});
  }
  const encrypt = await bcrypt.hash(password,10);
  let user = new userModel({name,email,password:encrypt});
  await user.save();
   res.status(200).send({'msg':"registered successfully"})
} catch (error) {
  res.status(400).send({'msg': error.message});
}

})


// login user
userRouter.post('/login',async (req,res)=>{
const {email,password} = req.body;
try {
  const oldUser = await userModel.find({email});
  if(oldUser.length>0 && (await bcrypt.compare(password,oldUser[0].password))){
      
    const token = jwt.sign({"userID":oldUser[0]._id},"krishna",{expiresIn:"1h"});
    res.send({'msg': 'login successful',"token":token});
  }else{
    res.send({'msg': 'login failed'});
  }


} catch (error) {
  res.status(400).send({'msg': error.message});
}

})

userRouter.use(authenticate);

userRouter.get('/getProfile', async(req,res)=>{
  const id = req.body.userID;
  let user = await userModel.find({_id:id});
  // console.log(req.body.userID);
  if(user.length>0){
    res.status(200).json(user);
  }else{
    res.status(400).send({'msg': 'User not found'});
  }
})

userRouter.get('/calculate', async(req,res)=>{
  const {annual_installment,interest,years} = req.body;
  let i = interest/100;
  let power = Math.pow(1+i,years)
  console.log(i,power)
  const maturity = (annual_installment * ((power-1)/i)).toFixed(0);
  const investment = annual_installment * years;
  const gain = maturity-investment;
  // console.log(maturity,investment,gain);
  res.status(200).send({"maturity": maturity, "investment":investment, "gain": gain});
})

module.exports = {userRouter}