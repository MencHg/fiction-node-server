const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { join } = require('path');
const passport = require('passport');
const mongURI = require('./src/assets/config').mongoUri;
const PORT_ = 9915;
const app = express();
mongoose
  .connect(mongURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log("database connect OK"); })
  .catch(() => { console.log("database connect NG"); });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
//这一步操作等同于const passportJwt = require('./src/assets/passport'); passportJwt(passport);
require('./src/assets/passport')(passport);
app.use(express.static(join(__dirname, "public")));
app.use('*', (req, res, next) => {  //设置跨域访问
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "text/html", "application/json;charset=utf-8");
  next();
});
/* blog router */
app.use('/blog/user', require('./src/router/blog/user'));
app.use('/blog/book', require('./src/router/blog/book'));
app.use('/blog/discuss', require('./src/router/blog/discuss'));
/* fiction router */
app.use('/fiction', require('./src/router/fiction_qqxs/detail'));
app.use('/fiction', require('./src/router/fiction_qqxs/charplist'));
app.use('/fiction', require('./src/router/fiction_qqxs/search'));
app.use('/fiction', require('./src/router/fiction_qqxs/category'));
app.use('/fiction', require('./src/router/fiction_qqxs/home'));
/*  */
app.listen(PORT_, () => { console.log("service in " + PORT_ + " port running...") });