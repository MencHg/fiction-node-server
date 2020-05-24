const Router = require('express').Router()
const {JSDOM} = require('jsdom');
const transcode = require('../../assets/transcode');
const passport = require('passport');
Router.get('/detail',async function(req,res){
  let data = await transcode.$transcode(`xs/${req.query.id}`)
  if(data===null){
    // 如果用户传过来的 id 是错误的这里的的他是个 null
    res.json({
      message: "find ng",
      code: 1,
      result: data
    })
  }else{
    let article = setArticle(data);
    res.json({
      message: "find ok",
      code: 1,
      result: article
    })
  }
})
Router.get('/detail', passport.authenticate('jwt', { session: false }), async function(req,res){
  let data = await transcode.$transcode(`xs/${req.query.id}`)
  if(data===null){
    // 如果用户传过来的 id 是错误的这里的的他是个 null
    res.json({
      message: "find ng",
      code: 1,
      result: data
    })
  }else{
    let article = setArticle(data);
    res.json({
      message: "find ok",
      code: 1,
      result: article
    })
  }
})
module.exports = Router;
function setArticle(data) {
  let dom_ = new JSDOM(data);
  let eles = dom_.window.document.getElementById('contentBody');
  let article = {
    title: eles.querySelector('.zhangjieming h1').textContent,
    content: eles.querySelector('#contentBody .zhangjieTXT').innerHTML.replace(/&nbsp;|\s+/g, "").split("<br><br>").splice(1),
    article_next: eles.querySelectorAll('#contentBody .bottem a')[3].href.slice(23),
    article_prev: eles.querySelectorAll('#contentBody .bottem a')[1].href.slice(23)
  };
  return article
}