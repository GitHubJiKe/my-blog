const router = require('koa-router')();
var path = require('path');
const controller = require('../controllers/article');
const userCon = require('../controllers/user');
const photoCon = require('../controllers/photo');
const multer = require('koa-multer');
var uploader = multer({ dest: path.join(__dirname,'../public/images/') })
var appVersion = require('../config/appVersion');

const routers = router
    .get('/', async (ctx,next)=>{
        ctx.state = {data:{version:appVersion.version}};
        await ctx.render('index');
    })
    .get('/getAll', controller.getAll)
    .post('/addOne', controller.addOne)
    .delete('/deleteOne/:id', controller.deleteOne)
    .post('/updateOne/:id', controller.updateOne)
    .post('/uploadAvatar',uploader.single('avatar'), photoCon.uploadAvatar)
    .post('/uploadPhotos',uploader.array('photo', 12), photoCon.uploadPhotos)
    .get('/getAllPhotos',photoCon.getAllPhotos)

module.exports = routers;
