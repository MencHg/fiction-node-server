const Router = require('express').Router()
const { JSDOM } = require('jsdom');
const transcode = require('../../assets/transcode');
Router.get('/category', async function (req, res) {
  let type = req.query.typeid || "fenlei1/"
  let page = req.query.page || 1
  let data = await transcode.$transcode(`${type}${page}`)
  if (data === null) {
    res.json({
      message: "find ng",
      code: 1,
      result: {}
    })
  } else {
    let dom_ = new JSDOM(data);
    let elemens = dom_.window.document.querySelectorAll('#main #alist #alistbox');
    let page_number = dom_.window.document.querySelector('.articlepage #pagelink .last').textContent / 1;
    let list = [];
    elemens.forEach(item => {
      let obj_ = {
        cover_image: item.querySelector('.pic a img').src,
        title: item.querySelector('.info h2 a').textContent,
        link: item.querySelector('.info h2 a').href.slice(23),
        author: item.querySelector('.info .title span').textContent,
        desc: item.querySelector('.info .intro').textContent.replace(/\s+/g, ""),
        article_count: item.querySelector('.info .sys a').textContent,
      }
      list.push(obj_);
    });
    res.json({
      message: "find ok",
      code: 1,
      result: {
        page_number,
        list
      }
    })
  }
})
module.exports = Router;