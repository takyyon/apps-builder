const mongoose = require('mongoose');

const problemSchema = mongoose.Schema({
    name: String,
    description: String,
    icon: String,
    created: {type: Date, default: Date.now}
}, {collection: 'problem'});

module.exports = problemSchema;