const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: String,
    description: String,
    icon: String,
    created: {type: Date, default: Date.now}
}, {collection: 'category'});

module.exports = categorySchema;