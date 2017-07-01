const mongoose = require('mongoose');
const config = require('../config/config');
//  require('./user');
const Article = require('./article');
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
    email: {
        type: String,
    }
});
// mongoose.Promise = global.Promise;
// var db = mongoose.createConnection(config.database);
// const Article = db.model('article', ArticleSchema);
// var user = new User({
//     username:'Peter1',
//     password:'1231',
//     email:'1215729026@qq.com'
// });

// user.save((user)=>{
//     console.log(user);
// });

// User.create({
//     username:'Peter',
//     password:'123',
//     email:'1215729026@qq.com'
// },(err,result)=>{
//     console.log(err,result);
// });

// function  findUser(cb) {
//     console.log('start search');
//     User.find({}, cb);
// }



// findUser((err,result)=>{
//     console.log(err,result);
// });



var article  = new Article({
    title:'Title',
    content:'Content',
    tags:['Test'],
    author:'Peter',
    createTime:Date.now(),
    updateTime:Date.now()
});

// article.save();

Article.remove({_id:"5955e95ddca498bdc0b24ff3"},(err,result)=>{
    console.log(err,result);
});