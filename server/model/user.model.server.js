const mongoose = require('mongoose');
const schema = require('../schema/user.schema.server');
const model = mongoose.model('User', schema);

module.exports = model;