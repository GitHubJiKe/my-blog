const Article = require('./../models/article');
const User = require('./../models/user');
const Photo = require('./../models/photo');


module.exports = {
    async addOne(ctx) {
        console.log('A');
        let body = ctx.request.body;
        let result = {
            statusCode: 200,
            text: '添加成功',
            data: []
        };
        const { title, content } = body;
        if (!title && !content) {
            result.text = '请输入文章标题和内容';
            ctx.body = result;
        } else {
            body.createTime = Date.now();
            let newArticle = await Article.create(body);
            if (!newArticle) {
                result.statusCode = 300;
                result.text = '添加失败';
            }
            let articles = await Article.find({});
            if (articles) result.data = articles;
            ctx.body = result;
        }
    },

    async deleteOne(ctx) {
        let id = ctx.params.id;
        let result = {
            statusCode: 200,
            text: '删除成功',
            data: []
        };
        let article = await Article.findOne({ _id: id });
        if (article) {
            await Article.remove({ _id: id });
        } else {
            result.statusCode = 200;
            result.text = '该文章已不存在';
        }
        let articles = await Article.find({});
        if (articles) result.data = articles;
        ctx.body = result;
    },

    async updateOne(ctx) {
        let id = ctx.params.id;
        let body = ctx.request.body;
        let result = {
            statusCode: 200,
            text: '更新成功',
            data: []
        };
        let res = await Article.update({ _id: id }, body);
        if (!res) {
            result.stausCode = 300;
            result.text = '更新失败,请重试';
        }
        let articles = await Article.find({});
        if (articles) result.data = articles;
        ctx.body = result;
    },

    async getAll(ctx) {
        let result = {
            statusCode: 200,
            text: '获取成功',
            data: [],
            avatar: ''
        };
        let articles = await Article.find({});
        let user = await User.findOne({ username: 'Peter' });
        if (!articles) {
            result.statusCode = 300;
            result.text = '获取失败,请重试';
        }
        if (articles) result.data = articles;
        if (user) result.avatar = user.avatar;
        ctx.body = result;
    },

    async deleteMany(ctx) {

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
            result.photos.push(url);
        });
        await Photo.insertMany(photos).then((res)=>{
            if(res) result.photos = res;
            ctx.body = result;
        });
        
    }
}