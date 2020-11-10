var express = require('express');
var router = express.Router();
var moment = require('moment');
var {mainModel} = require('../model/model')
/* GET home page. */
//获取文章数据列表
router.get('/',async function(req, res, next) {
  let page =req.query.page || 1
  //封装页面需要的所有数据
  let data = {
    totle:'',      //总页数
    currentPage:page, //当前页码
    list:[], //当前页码渲染的数据列表
  }
  let pageSize = 2 //每页显示的条数
  let datalist = await mainModel.find()
  .limit(pageSize)  //每一页显示的最大条数
  .sort({_id: -1})   //倒叙展示
  .skip(pageSize*(data.currentPage-1))//跳过本页之前的数据
  //总页码数:向上取整
  // data.totle = datalist.length/pageSize
  data.totle = Math.ceil(await mainModel.find().count() / pageSize)
  //遍历数组将时间转换成格式化
  datalist.map(item =>{
    item['time'] =moment(item.id).format('YYYY-MM-DD HH:mm:ss')
  })
//页面数据
  data.list= datalist

//拦截首页首先从session拿到用户名
  let username = req.session.username || '';
  res.render('index', {username, title: 'Express' ,data:data});
});

//注册页面
router.get('/register', function(req, res, next) {
  res.render('register', { });
});

//登陆页面
router.get('/login', function(req, res, next) {
  res.render('login', { });
});
//文本编辑页面
router.get('/main', async function(req, res, next) {
  var username=req.session.username||'';
  //获取到传输过来的id
  var id= parseInt(req.query.id)
  var page =req.query.page
  //页面需要的数据，封装成对象
  var item={
    title:"",
    content:"",
  }
  if(id){
    //编辑
    //查找数据
    item=await mainModel.findOne({id:id})

    item.page=page
    //渲染页面
    res.render('main',{username,item})
  }else{
    //编辑
    res.render('main',{username,item})
  }

  // res.render('main', { });
});
//详情页面
router.get('/detailPage',async function(req, res, next){
  var id=parseInt(req.query.id)

  let data=await mainModel.findOne({id})
  let username = req.session.username || '';

  res.render('detailPage', {username,data});
})

module.exports = router;
 