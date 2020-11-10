const fs = require('fs')
var express = require('express');
const multiparty = require('multiparty')
//导入数据库链接模板*
const { mainModel } = require('../model/model')
// const session = require('express-session')
var router = express.Router();

//创建写文章接口
router.post('/main',async function(req, res,next){
    var id = parseInt(req.body.id);
    if(id){ //编辑
      var title = req.body.title
      var page = req.body.page
      var content = req.body.content
    
    const article = await mainModel.findOne({ id })
    article.set({
      title: title,
      content: content
    })
    article.save()
    res.redirect('/?page='+page)
    }else{ //新增
       var data ={
        title : req.body.title,
        content : req.body.content,
        username : req.session.username,
       } 
      let main = new mainModel(data) 
      main.save()
      res.redirect('/')
    }
    })




    //上传文件接口
    router.post('/upload', function(req, res,next){
      var form = new multiparty.Form();
      form.parse(req,function (err,fields,files){
        if (err){console.log('上传失败')}else{
          let file = files.upload[0]
          let rs =fs.createReadStream(file.path)
          let newRs = '/upload' + file.originalFilename
          let ws = fs.createWriteStream('./public'+newRs)
          rs.pipe(ws)
          ws.on('close',function(){
            res.send({uploaded:1,url:newRs})
          })
        }
      })

    })
   //新增一个删除的接口
router.get('/delete',  function(req, res, next) {
  var id=req.query.id
  var page =req.query.page
  mainModel.deleteMany({ id },function(err){console.log(err)})
  res.redirect('/?page=' + page)
  console.log(id);
  console.log(page);
})
  
//导出
module.exports = router;