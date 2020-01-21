const mongoose = require('mongoose');
const schema = require('./../schema/platform.schema.server');
const model = mongoose.model('Platform', schema);

module.exports = model;