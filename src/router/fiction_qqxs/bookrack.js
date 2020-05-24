const Router = require('express').Router()
const bookrackdb = require('../../moudle/bookrack')
const passport = require('passport');
Router.post('/add/bookrack', passport.authenticate('jwt', { session: false }),async function (req,res) {
    let isbook = await bookrackdb.findOne({bookid:req.body.bookid,id:req.user._id})
    if(isbook===null){
        await bookrackdb.create({
            bookid:req.body.bookid,
            id:req.user._id,
            article_title: req.body.article_title,
            cover_image:req.body.cover_image,
            article_intro: req.body.article_intro,
            article_status:req.body.article_status,
            author:req.body.author,
            lately:{
                id:"无记录",
                title:"无记录"
            }
        })
        res.json({
            message:"添加成功!~",
            success:'ok',
        })
    }else {
        res.json({
            message:"请勿重复添加!~",
            success:'ok',
        })
    }
})
Router.post('/find/bookrack', passport.authenticate('jwt', { session: false }),async function (req,res) {
    let bookrack = await bookrackdb.find({id:req.user._id})
    res.json({
        code:200,
        success:"ok",
        bookrack
    })
})
Router.post('/remove/bookrack', passport.authenticate('jwt', { session: false }),async function (req,res) {
    let isbook = await bookrackdb.findOne({bookid:req.body.id,id:req.user._id})
    if(isbook){
        await bookrackdb.deleteMany({bookid:req.body.id,id:req.user._id})
        res.json({
            message:"删除成功!~",
            success:'ok',
        })
    }
})
Router.post('/lately/update', passport.authenticate('jwt', { session: false }),async function (req,res) {
    let isbook = await bookrackdb.findOne({bookid:req.body.id,id:req.user._id})
    if(isbook){
        await bookrackdb.updateOne({bookid:req.body.id,id:req.user._id},{lately:req.body.lately})
        res.json({
            message:"更新成功!~",
            success:'ok',
        })
    }
})
module.exports = Router
