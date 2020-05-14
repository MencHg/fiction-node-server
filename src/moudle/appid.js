const mongoose = require('mongoose');
let cryptoKit = require('../assets/cryptoKit');
const userSchema = new mongoose.Schema({
  
  email: {  //邮箱
    type: String,
    required: true,
    match: /^\w+@[a-z0-9]+\.[a-z]+$/i
  },
  password: {
    type: String,
    required: true,
    //match: /^(?![\d]+$)(?![a-zA-Z]+$)(?![.!#$%^&*]+$)[\da-zA-Z!.#$%^&*]{6,20}$/, //密码验证正则
  },
  createTime: { type: Date,default: new Date() },//创建时间
  power: {
    userLevel: { type: Number, default: 0 }, //用户等级
    administrator: { type: Boolean, default: false }, //管理员权限
    verify: { type: Number, default: 0 }, //验证权限
    vip:{type:Number,default:0}, //vip等级
  },
  userinfo: {
    nickname: { type: String, default: "迷之用户" }, //昵称
    avatarUrl: { type: String, default: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3552689717,4084494534&fm=26&gp=0.jpg" },
    city: { type: String, default: "未设置" }, //城市
    gender: { type: String, default: "未设置" }, //用户性别
    phone: {
      type: String,
      match: /^1[3-9]\d{9}$/, //手机号验证
    },
    registerTime: { type: Date, default: new Date() }, //注册时间
    motto: { type: String, default: "Live and let live.’ That's my motto." }, //座右铭
    other:{type:Object} //其他
  },
  more:{type:Object}, //更多
  other:{type:Object} //其他
});
userSchema.pre('save', function (next) {
  if(this.password){
    let pwd_ = cryptoKit(this.password);
    this.password = pwd_;
    next();
  }else{
    next();
  }
})
module.exports = mongoose.model('users', userSchema);