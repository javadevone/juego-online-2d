var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');

var appDirectory = path.dirname(require.main.filename);
console.log(appDirectory);

var htmlHeaders = {"Content-Type": "text/html"};
var cssHeaders = {"Content-Type": "text/css"};

var html = "por defecto";
fs.readFile(appDirectory + '/index.html', 'utf8', function(err, contents) {
	html = contents;
});

var server = http.createServer(function(req, res){
	var page = url.parse(req.url).pathname;
	console.log(page);
	res.writeHead(200, htmlHeaders);
	//res.writeHead(200, cssHeaders);
	//res.writeHead(200);
	res.write(html);
	res.end();
});

server.listen(8080);