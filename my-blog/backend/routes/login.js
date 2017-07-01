var router = require('koa-router')();
const userInfoController = require('../controllers/user');

const routers = router
    .get('/', async (ctx) => {
        const title = 'login home';
        await ctx.render('login', {
            title
        })
    })
    .post('/signup', userInfoController.signUp)
    .post('/signin', userInfoController.signIn)

module.exports = routers;