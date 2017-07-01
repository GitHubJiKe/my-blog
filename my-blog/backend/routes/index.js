const router = require('koa-router')();
const controller = require('../controllers/article');

const routers = router
    .get('/', async (ctx,next)=>{ctx.render('index.html',{})})
    .get('/getAll', controller.getAll)
    .post('/addOne', controller.addOne)
    .delete('/deleteOne/:id', controller.deleteOne)
    .post('/updateOne/:id', controller.updateOne)

module.exports = routers;
