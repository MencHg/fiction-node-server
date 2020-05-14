const Router = require('express').Router();
const bookdb = require('../../moudle/book');
const passport = require('passport');
Router.get('/detail',async function(req,res){
  bookdb.findById(req.query.id)
    .populate('auth')
    .select()
    .then(result=>{
      res.json({
        code:200,
        book:result
      })
    })
    .catch(err=>{
      res.json({
        code:200,
        book:"该文章不存在!~"
      })
    })
})
Router.get('/list',async function(req,res){
  let bookList = await bookdb.find()
  res.json({
    code:200,
    bookList
  })
})
Router.post('/add',passport.authenticate("jwt", { session: false }),async function(req,res){
  let title = req.body.book.slice(4,req.body.book.indexOf("\n")) || req.body.book.slice(0,20)
  let book = bookdb.create({
    auth:req.user._id,
    book:req.body.book,
    title
  })
  if(book){
    res.json({
      code:200,
      book
    })
  }else{
    res.json({
      code:200,
      book,
      message:"存储失败"
    })
  }
})
Router.delete('/remove',passport.authenticate('jwt',{session:false}),async function(req,res){
  let book = req.query.id
  if(req.user._id === req.query.auth){
    bookdb.deleteOne({_id:req.query.id})
      .then(result=>{
        res.json({
          code:200,
          result,
          message:"删除成功!~"
        })
      })
      .catch(err=>{
        res.json({
          code:200,
          result:err,
          message:"删除成功!~"
        })
      })
  }else{
    res.json({
      code:200,
      result:null,
      message:"删除失败你不是该文章的作者!~"
    })
  }
})
module.exports = Router