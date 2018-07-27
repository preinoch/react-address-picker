var express = require('express');
var app = express();
var fs = require('fs')

const address = fs.readFileSync(__dirname+'/address.json');

app.get('/', function(req, res){
  res.send(address.toString('utf8'));
});

app.get('/provinces', function(req, res){
  console.log(JSON.parse(address.toString('utf8')).address[0])
  res.send(JSON.parse(address.toString('utf8')).address[0]);
});

app.listen(8000);
console.log('Server On localhost:8000')