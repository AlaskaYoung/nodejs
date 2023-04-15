const express = require('express')
const bodyparser = require('body-parser')
const lowDb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const app = express()
const db = lowDb(new FileSync('db.json'))
const port = 8080
var smscode = "597398 3D Secure doДџrulama Еџifreniz ile DISCORD adlД± iЕџ yerinde yaptД±ДџД±nД±z bnhk0952 referans nolu, 26.99TL'lik alД±ЕџveriЕџ iЕџleminizi tamamlayabilirsiniz."
const regexp = /\w{6}/
const regexptid = /\w{4}\d{4}/

db.defaults({codes: []}).write()

var urlencodedParser = bodyparser.json()

app.post('/sendsms', urlencodedParser, (req, res) => {
smscode = (req.body.sms.match(regexp)[0] || ['error']);
tid = (req.body.sms.match(regexptid)[0] || ['error']);
db.get("codes").push({tid:tid,smscode:smscode}).write()
console.log(tid+" "+smscode)
res.end("success");
})

app.get('/testget', urlencodedParser, (req, res) => {
if(smscode!="none" && smscode!="error"){
  let tid = req.query.tid;
  smscode = db.get("codes").find({"tid":tid}).value().smscode
  res.end(smscode);
  smscode = "none";
}
else{
  res.end(smscode);
}
})

app.listen(port, () => {
  console.log(`start ${port} new`)
})