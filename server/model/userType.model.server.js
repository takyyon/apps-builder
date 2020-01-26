const mongoose = require('mongoose');
const schema = require('../schema/userType.schema.server');
const model = mongoose.model('UserType', schema);

module.exports = model;