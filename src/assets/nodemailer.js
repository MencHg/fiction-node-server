const nodemailer = require('nodemailer');
const emailKey = require('../assets/config').emailKey;
const verifyDb = require('../moudle/verify')
const transporter = nodemailer.createTransport(emailKey)
let code = Math.random().toString().slice(-6);

function send(email) {
  let emailOption = {
    from:"webmingh@qq.com ",
    to:email,
    subject:"账号验证码",
    text:"贝贝阅读,修改密码的验证码",
    html:`
      <h2>嘿 ${ email }!</h2>
      <p>这是一封用于你修改账号密码的验证邮件,如非您本人操作,请忽略本邮件!~</p>
      <p>本次验证码为 ${code} ,官方团队不会以任何形式向您索取验证码,为了您的账号安全请您不要轻易泄露验证码.</p>
      <p>请于 5 分钟内键入此验证码,已完成下一步操作,验证码过期后会失效.</p>
      <br>
      <p>感谢您使用我们的服务,祝您生活愉快.</p>
      <p>贝贝书屋团队!~</p>
    `,
    attachments:[]
  }
  return new Promise((resulve,reject)=>{
    transporter.sendMail(emailOption,(err,info)=>{
      if(err)reject(null)
      verifyDb
        .create({ email:emailOption.to, verify:code})
        .then(result=>{
          resulve(result)
        })
        .catch(err=>{
          reject(null)
        })
    })
  })
};
module.exports = send;
