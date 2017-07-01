const Article = require('./../models/article');

module.exports = {
    async addOne(ctx) {
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
            if(!newArticle){
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
            data: []
        };
        let articles = await Article.find({});
        if (!articles) {
            result.statusCode = 300;
            result.text = '获取失败,请重试';
        }
        if (articles) result.data = articles;
        ctx.body = result;
    },

    async deleteMany(ctx) {

    }
}