const Router = require('express').Router()
const { JSDOM } = require('jsdom');
const transcode = require('../../assets/transcode');
Router.get('/charplist', async function (req, res) {
  let htmlDoc = await transcode.$transcode(req.query.id)
  if (htmlDoc === null) {
    res.json({
      code: 202,
      message: "find ng id is undefined !~"
    })
  } else {
    let Dom = new JSDOM(htmlDoc)
    let introEle = Dom.window.document.getElementById('maininfo'),
      recommentEle = Dom.window.document.querySelectorAll('#webhtml .box_con .tjlist a'),
      listEle = Dom.window.document.querySelectorAll('#webhtml .box_con #list dd a');
    let articleList = {
      cover_image: introEle.querySelector('#fmimg img').src,
      article_title: introEle.querySelector('#info h1').textContent,
      author: introEle.querySelector('#info p a').textContent,
      article_intro: introEle.querySelector('#info .introtxt').textContent.replace(/\s+/g, ""),
      article_status: introEle.querySelectorAll('#info p')[1].textContent,
      recomment: [],
      article_list: [],
    };
    getlist(recommentEle, articleList.recomment);
    getlist(listEle, articleList.article_list);
    res.json({
      message: "find ok",
      code: 1,
      articleList
    });
  };
});
module.exports = Router;


function getlist(eles,arr) {
  eles.forEach(item=>{
      let obj_ = {
          link:item.href,        
          title:item.textContent
      };
      arr.push(obj_);
  });
};