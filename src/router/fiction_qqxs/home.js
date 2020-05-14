const Router = require('express').Router()
const { JSDOM } = require('jsdom');
const transcode = require('../../assets/transcode');
Router.get('/home', async function (req, res) {
  let data = await transcode.$transcode()
  let root_ = new JSDOM(data);
  let eles_Head = root_.window.document.querySelectorAll('#hotcontent div.l .item'),
    eles_top = root_.window.document.querySelectorAll('#main .novelslist ul li');
  let banner = [], list = [];
  eles_Head.forEach(item => {
    let o_ = {
      cover_image: item.querySelector('.image a img').src,
      link: item.querySelector('.image a').href.slice(23),
      title: item.querySelector('dl dt a').textContent,
      desc: item.querySelector('dl dd').textContent,
    }
    banner.push(o_);
  });
  eles_top.forEach(item => {
    let o_ = {
      link: item.querySelector('a').href.slice(23),
      title: item.textContent
    }
    list.push(o_);
  });
  res.json({
    message: "find ok",
    code: 1,
    result: {
      banner,
      list
    }
  })
})
module.exports = Router