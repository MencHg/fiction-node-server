const Router = require('express').Router()
const { JSDOM } = require('jsdom');
const bookrackdb = require('../../moudle/bookrack')
const transcode = require('../../assets/transcode');
const passport = require('passport');
Router.get('/chaplist', async function (req, res) {
  if(req.query.id === undefined){
    res.json({
      code: 202,
      message: "id 参数出错!~",
      Error:req.query.id
    })
  }
  let htmlDoc = await transcode.$transcode(`xs/${req.query.id}`);
  if (htmlDoc === null) {
    res.json({
      code: 202,
      message: "find ng id is undefined !~"
    })
  } else {
    let articleList = setList(htmlDoc,req);
    res.json({
      message: "find ok",
      code: 1,
      articleList
    });
  };
});
Router.get('/chaplist/bookrack', passport.authenticate('jwt', { session: false }), async function (req, res) {
  if(req.query.id === undefined){
    res.json({
      code: 202,
      message: "id 参数出错!~",
      Error:req.query.id
    })
  }
  let htmlDoc = await transcode.$transcode(`xs/${req.query.id}`);
  let isLike = await bookrackdb.findOne({bookid:req.query.id,id:req.user._id})
  if (htmlDoc === null) {
    res.json({
      code: 202,
      message: "find ng id is undefined !~"
    })
  } else {
    let articleList = setList(htmlDoc,req,isLike);
    res.json({
      message: "find ok",
      code: 1,
      articleList
    });
  };
});
module.exports = Router;


function setList(htmlDoc,req,isLike = null) {
  let Dom = new JSDOM(htmlDoc)
  let introEle = Dom.window.document.getElementById('maininfo'),
      recommentEle = Dom.window.document.querySelectorAll('#webhtml .box_con .tjlist a'),
      listEle = Dom.window.document.querySelectorAll('#webhtml .box_con #list dd a');
  let articleList = {
    id:req.query.id,
    like:isLike ? true : false,
    cover_image: introEle.querySelector('#fmimg img').src,
    article_title: introEle.querySelector('#info h1').textContent,
    author: introEle.querySelector('#info p a').textContent,
    article_intro: introEle.querySelector('#info .introtxt').textContent.replace(/\s+/g, ""),
    article_status: introEle.querySelectorAll('#info p')[1].textContent,
    recomment: [],
    article_list: [],
  };
  getlist(recommentEle, articleList.recomment);
  getlist(listEle, articleList.article_list,req.query.id);
  return articleList
}
function getlist(eles,arr,id) {
  eles.forEach(item=>{
      let obj_ = {
          link:item.href,        
          title:item.textContent,
          article_id:id
      };
      arr.push(obj_);
  });
};