const mongoose = require('mongoose');
const schema = require('./../schema/tag.schema.server');
const model = mongoose.model('Tag', schema);

module.exports = model;