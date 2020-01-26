const mongoose = require('mongoose');

const featureSchema = mongoose.Schema({
    name: String,
    description: String,
    time: Number,
    cost: Number,
    icon: String,
    selected: Boolean,
    app: {type: mongoose.Schema.Types.ObjectId, ref: 'App'},
    images: [{ type: String }],
    platforms: [{type: mongoose.Schema.Types.ObjectId, ref: 'Platform'}],
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    created: {type: Date, default: Date.now}
}, {collection: 'feature'});

module.exports = featureSchema;