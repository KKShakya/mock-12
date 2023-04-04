const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = mongoose.connect(process.env.mongoUrl);


module.exports = {connectDb};