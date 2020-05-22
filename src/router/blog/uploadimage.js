const Router = require('express').Router();
const passport = require('passport');
const fs = require('fs');
Router.post('/upload/image', function(req, res) { //,passport.authenticate('jwt', { session: false })
    let imgData = req.body.image;
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, '');
    let dataBuffer = Buffer.from(base64Data, 'base64');
    let fileName = "/static/"+Date.now()+".png"
    fs.writeFile('./public'+fileName, dataBuffer, (err)=>{
        if(err){
          res.json({message:"保存失败",fileName:null});
        }else{
          res.json({message:"保存成功",fileName});
        }
    });
})
module.exports = Router;