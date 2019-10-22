var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/hsuser', {useNewUrlParser: true});
var Schema = mongoose.Schema

var articleSchema = new Schema({
    theme:{
        type:String,
        required:true
    },
    username:{
        type:String
    },
    models:{
        type:String
    },
    //文章发表时间
    atime:{
        type:Date
    },
    //内容
    content:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Article',articleSchema)