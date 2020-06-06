/**
 * 登录请求拼接 url 实例
 * https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
 * https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
 * https://api.weixin.qq.com/wxa/getpaidunionid?access_token=ACCESS_TOKEN&openid=OPENID
 */
const wechat = require('../assets/config').wechat;
const axios = require('axios');

module.exports = {
  openid:async function(jscode) {
    let result = await axios(`${wechat.url}?appid=${wechat.appId}&secret=${wechat.appSecret}&js_code=${jscode}&grant_type=authorization_code`);
    return result.data;
  },
  accessToken: async function() {
    let result = await axios(wechat.accessToken + `&appid=${wechat.appId}&secret=${wechat.appSecret}`);
    console.log(result.data);
    return result.data;
  },
  getPaidUnionId: async function(access_token,openid){
    let result = await axios(wechat.paidUnionId + `?access_token=${access_token}&openid=${openid}`);
    return result.data;
  }
}
