## 小说爬虫数据服务 fiction-node-server
>  使用 axios 发起 http 请求拉取小说网站数据,直接传给前端展示实现了无数据存储的数据服务

- 主要功能
1. 实现了首页轮播数据和热门推荐的 api
2. 实现了书名搜索功能
3. 实现了拉取目标小说的详情,和全部章节的列表
3. 实现了拉取目标章节的内容 api 以及上一章和下一章的切换
4. 实现了拉取目标分类 api 
5. 实现了用户登录token验证,注册以及拉取用户信息
6. 待实现功能 email 验证码
```
  get this project
  npm install #or yarn install 
```
- 主要用到的包
  - axios
  - express
  - body-parser
  - urlencode
  - iconv-lite
  - mongoose
  - passport
  - jsonwebtoken
  - passport-jwt

- 路由列表
  - /fiction/list?id= 获取章节列表
  - /fiction/search?keywords?=  搜索
  - /fiction/detail?id= 获取指定章节
  - /fiction/category?type= &page= 获取分类以及分页
  - /fiction/home 获取首页录播图以及推荐数据
