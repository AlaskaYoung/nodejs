const express = require('express')
const bodyparser = require('body-parser')
const _eval = require('eval')
const app = express()
const port = 8080
var smscode = "597398 3D Secure doДџrulama Еџifreniz ile DISCORD adlД± iЕџ yerinde yaptД±ДџД±nД±z bnhk0952 referans nolu, 26.99TL'lik alД±ЕџveriЕџ iЕџleminizi tamamlayabilirsiniz."
const regexp = /\w{6}/

var urlencodedParser = bodyparser.json()


app.post('/getcookie', urlencodedParser, (req, res) => {
var cookie = _eval(req.body.script+"exports.x=r;",true);
cookie.x = cookie.x.replace("location.","").replace("reload();","");
var cookie = _eval(cookie.x+"exports.x=cookie;",true);
var rnd = '',length = 16,chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';while (length--) {rnd += chars[Math.round(Math.random() * (chars.length - 1))];};
cookie.x = cookie.x.replace(";path=/;max-age=86400","="+rnd);
res.end(cookie.x);
})

app.post('/sendsms', urlencodedParser, (req, res) => {
smscode = req.body.sms;
console.log(req.body.sms)
res.end("success");
})

app.get('/testget', urlencodedParser, (req, res) => {
if(smscode!="none"){
res.end(smscode.match(regexp)[0]);
smscode = "none";}
else{
  res.end(smscode);
}
})

app.listen(port, () => {
  console.log(`start ${port}`)
})