const mongoose = require('mongoose');

const userTypeSchema = mongoose.Schema({
    name: String,
    description: String,
    created: {type: Date, default: Date.now}
}, {collection: 'userType'});

module.exports = userTypeSchema;