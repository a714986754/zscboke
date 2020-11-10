var express = require('express');
//导入数据库链接模板
const { userModel } = require('../model/model')
var router = express.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
//创建注册接口
router.post('/register', function (req, res, next) {
  //用户注册数据获取
  let userDate = {
    username: req.body.username,
    password: req.body.password,
    password2: req.body.password2,
  }
  res.send(userDate)
  // 6实例化
  var userInfo = new userModel(userDate)
  // 7增删改查
  userInfo.save(function (err, userDate) {
    if (err) return console.error(err);
    // userDate.speak();
    console.log(userDate);
  })
})
//创建登陆接口
router.post('/login', function (req, res, next) {
  //用户登陆数据获取
  let userDate = {
    username: req.body.username,
    password: req.body.password,
  }
  //查询数据库
  userModel.find(userDate, function (err, myUser) {
    if (err) return console.error(err);
    //判断查询到相同到数据的条数来控制登陆成功与否         
    if (myUser.length > 0) {
      //登陆成功进行session会话储存
      req.session.username = userDate.username;
      res.redirect('/')
    } else {
      // console.log('登录失败')
      res.redirect('/login')
    }
  })
})

module.exports = router;
