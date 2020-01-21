const mongoose = require('mongoose');

const appSchema = mongoose.Schema({
    name: String,
    description: String,
    icon: String,
    images: [{ type: String }],
    problems: [{type: mongoose.Schema.Types.ObjectId, ref: 'Problem'}],
    platforms: [{type: mongoose.Schema.Types.ObjectId, ref: 'Platform'}],
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    created: {type: Date, default: Date.now}
}, {collection: 'app'});

module.exports = appSchema;