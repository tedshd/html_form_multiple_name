const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

var server = http.createServer(function (req, res) {
  const thisUrl = new URL(req.url, 'http://' + req.headers.host);
  const query = new URLSearchParams(thisUrl.search);
  switch (thisUrl.pathname) {
    case '/':
      fs.readFile('index.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
        res.write(data);
        res.end();
      });
      break;
    case '/get':
      res.writeHead(200, { "Content-Type": "application/json" });
      var json = JSON.stringify({
        'get_checkbox': query.getAll('get_checkbox'),
        'get_checkbox[]': query.getAll('get_checkbox[]'),
        'get_text': query.get('get_text'),
        'get_text_getall': query.getAll('get_text'),
      });
      res.end(json);
      break;
    case '/post':
      var formData = '';
      req.on('data', function (data) {
        formData += data;
      });
      req.on('end', function () {
        res.writeHead(200, { "Content-Type": "application/json" });
        var json = JSON.stringify({
          'post_checkbox': querystring.parse(formData)['post_checkbox'],
          'post_checkbox[]': querystring.parse(formData)['post_checkbox[]'],
          'post_text': querystring.parse(formData)['post_text'],
        });
        res.end(json);
      });
      break;

  }
});

server.listen(3000);

console.log('http://localhost:3000/');
