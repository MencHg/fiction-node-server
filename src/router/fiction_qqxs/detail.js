const Router = require('express').Router()
const {JSDOM} = require('jsdom');
const transcode = require('../../assets/transcode');
Router.get('/detail',async function(req,res){
  let data = await transcode.$transcode(`xs/${req.query.id}`)
  let dom_ = new JSDOM(data);
  let eles = dom_.window.document.getElementById('contentBody');
  let article = {
    title: eles.querySelector('.zhangjieming h1').textContent,
    content: eles.querySelector('#contentBody .zhangjieTXT').innerHTML.replace(/&nbsp;|\s+/g, "").split("<br><br>").splice(1),
    article_next: eles.querySelectorAll('#contentBody .bottem a')[3].href.slice(23),
    article_prev: eles.querySelectorAll('#contentBody .bottem a')[1].href.slice(23)
  };
  res.json({
    message: "find ok",
    code: 1,
    result: article
  })
})
module.exports = Router;
