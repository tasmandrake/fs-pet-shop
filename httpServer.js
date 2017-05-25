var http = require('http');
var fs = require ('fs');
var requestListener = function(req, res){
  var method = req.method;
  var urlArr = req.url.split('/');
  urlArr.shift();
  if(method === 'GET' && urlArr[1]){
    fs.readFile('pets.json', 'utf8', function (err,data){
      if(err){
        throw err;
      } else if (JSON.parse(data)[urlArr[1]]){
        var pets = JSON.parse(data);
        var pet = pets[urlArr[1]];
        var petJSON = JSON.stringify(pet);
        res.setHeaders('Content-Type', 'application/json');
        res.end(petJSON);
      } else {
        res.statusCode = 404;
        res.statusMessage = 'Not found';
        res.headers('Content-Type', 'text/plain');
        res.end('404 Not found');
      }
    });
  } else if(method === 'GET'){
    fs.readFile('pets.json', 'utf8', function (err,data){
      if(err){
        throw err;
      }else{
        res.setHeaders('Content-Type', 'application/json');
        res.end(data);
      }
    });
  }
};

var server =  http.createServer(requestListener);
server.listen(3000);
