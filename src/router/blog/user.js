const Router = require('express').Router();
let cryptoKit = require('../../assets/cryptoKit');
const userdb = require('../../moudle/appid');
const jwt = require('jsonwebtoken');
const jwtKey = require('../../assets/jwt').jwtOrKey;
const passport = require('passport');
Router.get('/userinfo', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    code: 200,
    info:{
      userinfo:req.user.userinfo,
      _id:req.user._id,
      createTime:req.user.createTime
    },
  })
})
Router.post('/login', async function (req, res) {
  let isUser = await userdb.findOne({ email: req.body.email })
  if (isUser !== null && isUser.password === cryptoKit(req.body.password)) {
    const rule_ = { id_: isUser._id, nickname: isUser.userinfo.nickname };
    jwt.sign(rule_, jwtKey, { expiresIn: 3600 * 24 * 7 }, (err, token) => {
      if (err) {
        res.json({ code: "0", message: "ng", data: err })
      } else {
        res.json({
          code: "1", message: "ok",
          userinfo: isUser.userinfo,
          token: "Bearer " + token
        });
      };
    });
  }else {
    res.json({
      code: "1", message: "ok",
      userinfo: isUser,
      message: "账号或密码错误!~"
    });
  }
})

Router.post('/register', async function (req, res) {
  let isUser = await userdb.findOne({ email: req.body.email })
  if (isUser !== null) {
    res.json({
      code: 200,
      data: "该邮箱已被抢先注册!~"
    })
  } else {
    let isAddStatus = await userdb.create(req.body)
    if (isAddStatus._id) {
      res.json({
        code: 200,
        data: "注册成功!~",
        message: isAddStatus
      })
    } else {
      res.json({
        code: 200,
        data: "注册失败!~",
        message: isAddStatus
      })
    }
  }
});
module.exports = Router;