const Router = require('express').Router()
const { JSDOM } = require('jsdom');
const transcode = require('../../assets/transcode');
const urlencode = require('urlencode');
Router.post('/search', async function (req, res) {
  if(req.body.keywords === undefined){
    res.json({
      list: [],
      page_number:0,
      message:"keywords 出错 ！~",
      Error:req.body.keywords
    })
  }
  let data = await transcode.$transcode(`modules/article/search.php?searchkey=${urlencode(req.body.keywords,'gbk')}`)
  if(data===null){
    res.json({
      list: [],
      page_number:0
    })
  }else{
    let domInit = new JSDOM(data);
    let elemens = domInit.window.document.querySelectorAll('#main #alist #alistbox');
    let page_number = domInit.window.document.querySelector('.articlepage #pagelink .last').textContent / 1;
    let dataArr = [];
    elemens.forEach(item => {
      let obj_ = {
        cover_image: item.querySelector('.pic a img').src,
        title: item.querySelector('.info h2 a').textContent,
        link: item.querySelector('.info h2 a').href.slice(23),
        author: item.querySelector('.info .title span').textContent,
        desc: item.querySelector('.info .intro').textContent.replace(/\s+/g, ""),
        article_count: item.querySelector('.info .sys a').textContent,
      }
      dataArr.push(obj_);
    })
    res.json({
      list: dataArr,
      page_number
    })
  }
})
module.exports = Router;