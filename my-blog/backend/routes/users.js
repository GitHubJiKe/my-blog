var router = require('koa-router')();
const User = require('../models/user');

router.get('/',  function (ctx, next) {
  User.find({username:'Peter'},(err,result)=>{
    console.log(JSON.stringify(result))
  });
  ctx.body = 'this a users response!';
});

module.exports = router;
