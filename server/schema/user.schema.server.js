const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    userType: {type: mongoose.Schema.Types.ObjectId, ref: 'UserType'},
    icon: String,
    created: {type: Date, default: Date.now}
}, {collection: 'user'});

module.exports = userSchema;