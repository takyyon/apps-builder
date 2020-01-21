const mongoose = require('mongoose');
const schema = require('../schema/app.schema.server');
const model = mongoose.model('App', schema);

module.exports = model;