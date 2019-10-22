var express = require('express')

//引进数据库
var Article = require('./models/article')
var Comment = require('./models/comments')
var User = require('./models/user')
var router = express.Router()

//====================get====================
//注册界面
router.get('/register', function (req, res) {
    res.render('./users/register.html')
})
//登录界面
router.get('/login', function (req, res) {
    res.render('./users/login.html')
})

//渲染首页
router.get('/', function (req, res) {
    Article.find(function (err, article) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('forum.html', {
            user: req.session.user,
            article: article
        })
    })
    //console.log(req.body.username)
})

//发起话题的页面
router.get('/topics/new', function (req, res) {
    res.render('./topic/new.html', {
        user: req.session.user
    })
})

//账户设置界面（修改密码）
router.get('/settings/admin', function (req, res) {
    res.render('./settings/admin.html', {
        user: req.session.user
    })
})


//退出
router.get('/logout', function (req, res) {
    // 清除登陆状态
    req.session.user = null

    // 重定向到登录页
    res.redirect('/login')
})

//用户设置界面
router.get('/settings/profile', function (req, res) {
    res.render('./settings/profile.html', {
        //把数据库给它才能用
        user: req.session.user
    })
})

//文章展示
router.get('/topic/show', function (req, res) {
    //需要先做个判断，当用户没有登录的时候，提示用户并返回到首页
    if(req.session.user == null){
        return res.status(500).send('请先登录再查看喔')
    }


    //console.log(req.body.id)
    //console.log(req.query.id)
    //console.log(req.session.user.nickname)
    Article.findById(req.query.id, function (err, article) {
        if (err) {
            console.log('失败')
            return res.status(500).send('Server error.')
        }
        //嵌套一下，把评论的数据也读出来，放进去
        //用find一定要合乎语法规范加上{theme:article.theme}，这样才能有条件搜索
        Comment.find({theme:article.theme},function(err,comment){
            if(err){
                console.log(article.theme)
                console.log('失败')
                return res.status(500).send('Server error.')
            }
            console.log(comment)
                res.render('./topic/show.html',{
                    user:req.session.user,
                    article:article,
                    comment:comment
                })
                //要找到标题名一样的才显示出来
                // if(req.query.theme == article.theme){

                // }

                // console.log(comment)
                // console.log(article.theme)
            //检查一下数据
            // console.log(req.query.theme)
            // console.log(article.theme)
        })

    })
    
    // console.log(req.query.id)
    // console.log(req.query.theme)
    //req.query.theme这个查不到
    // console.log(req.params.id)
    // console.log(req.params.theme)
    //console.log(article.theme)
})


//======================get=====================


//===============post======ssssssssssssssss============

//用户注册提交表单
router.post('/register', function (req, res) {
    //获取表单提交的数据
    //req.body
    //2.操作数据库
    //判断该用户是否存在
    //如果已存在，则不允许注册
    //如果不存在，则注册新建用户
    //3.发送响应
    var body = req.body

    //console.log(req.body)
    User.findOne({
        $or: [{
                username: body.username
            },
            {
                nickname: body.nickname
            }
        ]
    }, function (err, data) {
        if (err) {
            //这里用Json的原因是，在index中，ajax发起异步请求，默认的对象是json字符串格式，如果不用则无法看到
            return res.status(500).json({
                success: false,
                message: '服务端错误'
            })
            //return next(err)
        }
        //console.log(data)
        if (data) {
            //邮箱或者昵称已存在
            return res.status(200).json({
                err_code: 1,
                message: 'username or nickname already exists.'
            })
        }
        //console.log(body)
        //body.password = md5(md5(body.password)) 


        new User(body).save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'server error'
                })
                //return next(err)
            }

            //     //注册成功，使用session记录用户的登录状态
            req.session.user = user


            //  //Express提供了一个响应方法：json
            // //该方法接受一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
            res.status(200).json({
                err_code: 0,
                message: 'ok'

            })
            //res.redirect('/login')
        })

    })
})

//用户登录提交表单
router.post('/login', function (req, res) {
    //1.获取表单数据
    //2.查询数据库用户名是否正确
    //3.发送响应数据
    var body = req.body
    //console.log(data)
    User.findOne({
        username: body.username,
        passwd: body.passwd
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }

        // 如果邮箱和密码匹配，则 user 是查询到的用户对象，否则就是 null
        if (!user) {
            console.log(body.passwd)
            return res.status(200).json({
                err_code: 1,
                message: 'username or passwd  is invalid.'
            })
        }

        //用户存在，登录成功，记录登录状态，通过session记录登录状态
        req.session.user = user

        res.status(200).json({
            err_code: 0,
            message: 'ok '
        })
        //登录成功，重定向到论坛首页
        //res.redirect('/')
    })
})

//改变密码的这个做不出来，可能是思路有问题，换出来一个界面应该就可以做到了
router.post('/changepwd', function (req, res) {
    User.findOneAndUpdate(req.body.username, req.body.passwd, function (err) {
        if (err) {
            res.status(500).json({
                err_code: 1,
                message: 'fail'
            })
        }
        res.status(200).json({
            err_code: 0,
            message: 'ok'
        })
        res.redirect('/login')
    })
})

//用户修改设置提交表单
router.post('/settings/profile', function (req, res) {
    var body = req.body
    //console.log(body.username)
    User.findOneAndUpdate(body.username, body,
        function (err) {
            if (err) {
                //console.log(req.body.id)
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                })
            }
            //修改成功，记录登录状态，通过session记录登录状态

            req.session.user = body
            //  res.status(200).json({
            //      err_code:0,
            //      message:'ok '
            //  })
            //把数据库给它才能用
            //user: req.session.user
            //修改成功重定向到首页    
            res.redirect('/settings/profile', 301)
            // res.location('/settings/profile')

        })


})

//保存用户新密码
router.post('/settings/admin', function (req, res) {
    //拿到用户提交得数据先
    var body = req.body
    if (body.passwd != body.repeat) {
        res.render('./settings/admin.html', {
            data: '两次输入的密码不同，请重新输入',
            user: req.session.user
        })
    } else if (body.oldpwd != req.session.user.passwd) {
        res.render('./settings/admin.html', {
            data: '当前密码不正确，请重新输入',
            user: req.session.user
        })
    } else {
        User.findOneAndUpdate(body.username, body, function (err, data) {
            if (err) {
                return res.send('服务器出现错误，请重新尝试')
            }
            if (data) {
                req.session.user = null
                res.redirect('/logout')
            }
        })
    }

    // console.log(body.oldpwd)
    // console.log(body.newpwd)
    // console.log(body.repeat)
})

//发布文章
router.post('/topic/new', function (req, res) {
    //console.log(req.body)
    //判断文章标题和内容有没有填，没有则提示用户
    var body = req.body
    if (body.theme == "" || body.content == "") {
        res.render('./topic/new.html', {
            date: "标题及内容不可为空",
            //这里的user是给头部的信息的，否则头部还是显示登录注册
            user: req.session.user
        })
    } else {
        //如果都有内容，则保存到article数据库中
        new Article(body).save(function (err) {
            if (err) {
                res.render('./topic/new.html', {
                    date: "保存失败",
                    //这里的user是给头部的信息的，否则头部还是显示登录注册
                    user: req.session.user
                })
            }
            //否则就是成功
            //跳转到首页
            res.redirect('/')
        })
    }
})

//提交评论
router.post('/topic/show', function (req, res) {
    //方便后续操作
    var body = req.body
    //console.log(req.body.id)
    //console.log(req.query.id)
    //如果用户没有进行评论，则提示用户
    if (body.content == "") {
        res.redirect('/topic/show?id='+req.body.id)
    } else {
        //console.log(body)
        //进行保存
        new Comment(body).save(function (err) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: "save error"
                })
            }

            //保存成功就进行刷新了
            //重定向回这个页面
            //要通过它的id来指定哪个页面，否则无法进行跳转
            res.redirect('/topic/show?id='+req.body.id)
        })
    }
})

//===============post==================


module.exports = router