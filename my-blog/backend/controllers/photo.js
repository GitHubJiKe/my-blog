const Photo = require('./../models/photo');
const User = require('./../models/user');


module.exports = {
    async getAllPhotos(ctx) {
        let result = {
            statusCode: 200,
            text: '获取成功',
            photos: [],
        };
        let photos = await Photo.find({});
        if (!photos) {
            result.statusCode = 300;
            result.text = '获取失败,请重试';
        }else result.photos = photos;
        ctx.body = result;
    },

    async uploadAvatar(ctx) {
        var result = {
            statusCode: 200,
            text: '上传成功',
            avatar: ''
        }
        result.avatar = '/images/' + ctx.req.file.filename;
        await User.update({ 'username': 'Peter' }, { avatar: result.avatar });
        ctx.body = result;
    },
    // { fieldname: 'photos',
    // originalname: 'WechatIMG32.jpeg',
    // encoding: '7bit',
    // mimetype: 'image/jpeg',
    // destination: './public/images/',
    // filename: '4b7c1cf7ec38f2f65deb6ec2f36e08ae',
    // path: 'public/images/4b7c1cf7ec38f2f65deb6ec2f36e08ae',
    // size: 176823 }
    async uploadPhotos(ctx) {
        var result = {
            statusCode: 200,
            text: '上传成功',
            photos: []
        }
        var photos = [];
        ctx.req.files.forEach(v =>{
            let url = `/images/${v.filename}`;
            photos.push({url:url,uploadTime:Date.now()});
        });
        var ps = await Photo.insertMany(photos);
        result.photos = ps;
        ctx.body = result;
    }
}