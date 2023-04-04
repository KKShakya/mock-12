const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
  name:String,
  email:{
    type:String,
    require:true,
  },
  password:{
    type:String,
    require:true,
  },
  
})


const userModel  = mongoose.model('user',userSchema);

module.exports = {userModel};