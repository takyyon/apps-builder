const mongoose = require('mongoose');

const platformSchema = mongoose.Schema({
    name: String,
    description: String,
    icon: String,
    created: {type: Date, default: Date.now}
}, {collection: 'platform'});

module.exports = platformSchema;