const 
  express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  { join } = require('path'),
  passport = require('passport'),
  mongURI = require('./src/assets/config').mongoUri,
  PORT_ = 9915,
  app = express();
mongoose
  .connect(mongURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log("database connect OK"); })
  .catch(() => { console.log("database connect NG"); });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
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
/* fiction router */
app.use('/fiction', require('./src/router/fiction_qqxs/user'));
app.use('/fiction', require('./src/router/fiction_qqxs/discuss'));
app.use('/fiction', require('./src/router/fiction_qqxs/detail'));
app.use('/fiction', require('./src/router/fiction_qqxs/charplist'));
app.use('/fiction', require('./src/router/fiction_qqxs/search'));
app.use('/fiction', require('./src/router/fiction_qqxs/category'));
app.use('/fiction', require('./src/router/fiction_qqxs/home'));
/*  */
app.listen(PORT_, () => { console.log("service in " + PORT_ + " port running...") });