const mongoose = require('mongoose');
const config = require('../config/config');
const Schema = mongoose.Schema
const PhotoSchema = new Schema({
    url: {
        type: String,
        require: true
    },
    uploadTime: {
        type: Number,
        default:Date.now()
    }
});


mongoose.Promise = global.Promise;
var db = mongoose.connect(config.database);
var Photo = db.model('Photo', PhotoSchema);

module.exports = Photo;