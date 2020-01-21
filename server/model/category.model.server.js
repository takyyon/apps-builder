const mongoose = require('mongoose');
const schema = require('./../schema/category.schema.server');
const model = mongoose.model('Category', schema);

module.exports = model;