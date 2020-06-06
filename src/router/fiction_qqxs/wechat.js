const Router = require('express').Router();
const wechat = require('../../assets/wechat_login');
Router.post('/wechat/login',async function (req,res) {
  let openid = await wechat.openid(req.body.jscode);
  // let accessToken = await wechat.accessToken();
  // let paidUnionId = await wechat.getPaidUnionId(accessToken.access_token,openid.openid);
  // console.log(paidUnionId,accessToken,openid);
  res.json({
    code:200,
    data:openid,
    message:"get ok~"
  })
})
module.exports = Router;