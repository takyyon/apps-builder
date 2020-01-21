const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
    name: String,
    description: String,
    icon: String,
    created: {type: Date, default: Date.now}
}, {collection: 'tag'});

module.exports = tagSchema;