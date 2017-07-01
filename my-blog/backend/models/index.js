const mongoose = require('mongoose');

var UserSchema = reuqire('./user');



mongoose.Promise = global.Promise;
var db = mongoose.createConnection(config.database);
var User = db.model('users',UserSchema);

module.exports = User;