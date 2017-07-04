const User = require('./../models/user');

module.exports = {
    async signUp(ctx) {

        let result = {
            success: false,
            message: '注册失败'
        };
        const { username, email, password } = ctx.request.body;

        if (!username && !password) {
            result.message = '请填写用户名和密码';
            ctx.body = result;
        } else {
            let user = await User.findOne({ username });
            //检查用户名是否已存在
            if (!user) {
                const newUser = new User({
                    username: username,
                    password: password,
                    email: email,
                });

                const doc = await newUser.save();
                if (!doc.errors) {
                    ctx.body = { success: true, message: '注册成功' }
                } else {
                    ctx.body = result;
                }
                // 下面会代码执行时，会直接先跳过save的回掉处理，路由返回404，再执行err回掉，原因暂不清楚
                // await newUser.save(err => {
                //     if (err) {
                //         ctx.body = result;
                //     } else {
                //         ctx.body = {success: true, message: '注册成功'}
                //     }
                // })
            } else {
                ctx.body = { success: false, message: '用户名已存在' };
            }
        }
    },

    async signIn(ctx) {
        let result = {
            statucCode: 200,
            text: '登录成功'
        };
        //从请求体中获得参数
        const { username, password } = ctx.request.body;
        //检查数据库中是否存在该用户名
        let user = await User.findOne({ username, password });

        if (!user) {
            result.statucCode = 300;
            result.text = '用户名或密码错误';
        }
        ctx.body = result;
    },

    async addOne(ctx) {
        var result = {
            statusCode: 200,
            text: '上传成功',
            avatar: ''
        }
        result.avatar = '/images/' + ctx.req.file.filename;
        let user = await User.findOne({ username: 'Peter' });
        if (!user) new User({ username: 'Peter', password: '123', avatar: result.avatar }).save();
        else await User.update({ username: 'Peter' }, { avatar: result.avatar });

        ctx.body = result;
    }
}