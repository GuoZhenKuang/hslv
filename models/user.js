var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/hsuser', {useNewUrlParser: true});
var Schema = mongoose.Schema

var userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    passwd:{
        type:String,
        required:true
    },
    nickname:{
        type:String,
        required:true
    },
    produce:{
        type:String
    },
    gender:{
        //0是保密
        //1是男
        //2是女
        type:Number,
        enum:[0,1,2],
        default:0
    },
    birthday:{
        type:Date
    },
    status: {
        type: Number,
        // 0 没有权限限制
        // 1 不可以评论
        // 2 不可以登录
        enum: [0, 1, 2],
        default: 0
      },
      email:{
          type:String
      }
})

//把我数据导出
//User——相当于数据库名 
module.exports = mongoose.model('User',userSchema)