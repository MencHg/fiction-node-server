const Router = require('express').Router();
const bookdb = require('../../moudle/book');
Router.get('/detail',(req,res)=>{
  let bookId = req.query.id ?  req.query.id : ""
  res.json({
    code:200,
    book
  })
})
Router.get('/list',(req,res)=>{
  res.json({
    code:200,
    list
  })
})
Router.post('/add',(req,res)=>{
  let book = req.body.book
  res.json({
    code:200,
    list
  })
})
Router.delete('/remove',(req,res)=>{
  let book = req.query.id
  res.json({
    code:200,
    list
  })
})
module.exports = Router