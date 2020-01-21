const mongoose = require('mongoose');
const schema = require('./../schema/problem.schema.server');
const model = mongoose.model('Problem', schema);

module.exports = model;