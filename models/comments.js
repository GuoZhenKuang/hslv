var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/hsuser', {useNewUrlParser: true});
var Schema = mongoose.Schema

var commentSchema = new Schema({
    theme:{
        type:String
    },
    nickname:{
        type:String
    },
    content:{
        type:String
    },
    time:{
        type:Date
    },
    good:{
        type:Number
    }
})

//导出
module.exports = mongoose.model('Comment',commentSchema)