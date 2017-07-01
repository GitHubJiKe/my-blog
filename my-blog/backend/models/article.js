const mongoose = require('mongoose');
const config = require('../config/config');
const Schema = mongoose.Schema
const ArticleSchema = new Schema({
    title: {
        type: String,
        require: true,
        default: 'this is title'
    },
    content: {
        type: String,
        require: true,
        default: 'this is content'
    },
    createTime: {
        type: Number,
        default:Date.now()
    },
    updateTime: {
        type: Number,
        default:Date.now()
    },
    tags: {
        type: Array,
        default:[]
    },
    author:{
        type:String,
        default:'author name'
    }
});


mongoose.Promise = global.Promise;
var db = mongoose.connect(config.database);
var Article = db.model('article', ArticleSchema);

module.exports = Article;