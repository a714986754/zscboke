
var mongoose =require('./index')
// 4
var userSchema = mongoose.Schema({
    username:String,
    password:String,
    password2:String
})
var mainSchema = mongoose.Schema({
    title:String,
    content:String,
    username:String,
    id:Number,
})
// 5
var userModel = mongoose.model('Kitten',userSchema)

var mainModel = mongoose.model('mainModel',mainSchema)

module.exports ={
    userModel,
    mainModel
}