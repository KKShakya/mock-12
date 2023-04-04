const express = require('express');
const jwt = require('jsonwebtoken');

const authenticate  = (req,res,next)=>{

  const token = req.headers.token;
  // console.log(token)
  const decoded = jwt.verify(token,"krishna");
  if(decoded){
    const userid = decoded.userID;
    req.body.userID = userid;
    next();
  }else{
    return res.status(400).send({"msg":"Invalid token"})
  }


}

module.exports = {authenticate}