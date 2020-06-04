const Router = require('express').Router();
const userdb = require('../../moudle/appid');
const verifydb = require('../../moudle/verify');
const jwt = require('jsonwebtoken');
const jwtKey = require('../../assets/jwt').jwtOrKey;
const cryptoKit = require('../../assets/cryptoKit');
const passport = require('passport');
const nodemailer = require('../../assets/nodemailer');
Router.get('/userinfo', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    code: 200,
    info: {
      userinfo: req.user.userinfo,
      _id: req.user._id,
      createTime: req.user.createTime
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
  } else {
    res.json({
      code: "1", message: "ok",
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
    console.log(req.body);

    let isAddStatus = await userdb.create({
      email: req.body.email,
      password: req.body.password,
      "userinfo.nickname": req.body.nickname
    })
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
Router.post('/verify', async function (req, res) {
  async function sendCode() {
    let send = await nodemailer(req.body.email)
    if (send === null) {
      res.json({
        message: "发送失败",
        data: send.time,
        code: 201
      })
    } else {
      res.json({
        message: "发送成功",
        data: send.time,
        code: 200
      })
    }
  }
  // 先查询验证码数据中是否已经存在该用户的操作记录
  let find = await verifydb.findOne({ email: req.body.email });
  // 没有记录则查询返回 null 直接执行发送邮件验证
  if (find === null) {
    sendCode();
  }else{
    // 用户已经操作过邮箱验证,则先删除数据记录,再发送新的验证码至目标邮箱
    await verifydb.deleteMany({ email: req.body.email });
    sendCode();
  }
})
Router.post('/repassword', async function (req, res) {
  let code = await verifydb.findOne({ email: req.body.email })
  if(code === null){
    console.log(code === null)
    res.json({
      message: "没有查询到您的验证码记录哟!~",
      code: 201
    })
  }else{
    if (code.verify === req.body.verify) {
      // 验证成功更新用户密码
      // let up =
      await userdb.updateOne({email:req.body.email},{ password: cryptoKit(req.body.password) })
      // 清除已经完成验证的验证码数据
      await verifydb.deleteMany({ email: req.body.email })
      res.json({
        message: "密码修改成功!~",
        // data:send.time,
        code: 200
      })
    }else{
      console.log(req.body.verify)
      res.json({
        message: "验证码不正确或验证码超时!~",
        // data:send,
        code: 201
      })
    }
  }

})
module.exports = Router;