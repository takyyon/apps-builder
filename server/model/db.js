const constants = require('./../assets/constants')();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI  || constants.mongodbString);