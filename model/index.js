const { log } = require('debug')
var mongoose =require('mongoose')

mongoose.connect('mongodb://localhost/zscBlog')
.then(()=>{console.log('数据库连接成功')})
.catch((err)=>{console.log('数据库连接失败，错误提示：'+ err)})


module.exports = mongoose