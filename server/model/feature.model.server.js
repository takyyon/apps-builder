const mongoose = require('mongoose');
const schema = require('./../schema/feature.schema.server');
const model = mongoose.model('Feature', schema);

module.exports = model;