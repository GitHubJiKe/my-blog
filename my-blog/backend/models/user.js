const mongoose = require('mongoose');
const config = require('../config/config');
const Schema = mongoose.Schema
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
    }
});

mongoose.Promise = global.Promise;
var db = mongoose.connect(config.database);
var User = mongoose.model('users',UserSchema);
module.exports = User;


