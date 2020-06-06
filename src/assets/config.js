module.exports = {
  mongoUri1:'mongodb+srv://ahui:1076236bb..@cluster0-snncj.gcp.mongodb.net/blog?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',
  mongoUri:'mongodb://122.51.149.141:27017/fiction',
  emailKey:{
    service:'qq',
    auth:{
      user:"webmingh@qq.com",
      pass:"wacrtlgqghlabjbe"
    }
  },
  wechat:{
    appId: "wx0e56e6a6021ef79a",
    appSecret: "f977b1af77898bbb5e3c34eefd7392c7",
    url:"https://api.weixin.qq.com/sns/jscode2session",
    accessToken:`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential`,
    paidUnionId:"https://api.weixin.qq.com/wxa/getpaidunionid"
  }
}