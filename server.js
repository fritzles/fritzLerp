var restify = require("restify");
var io = require('socket.io').listen(80);
var server = restify.createServer();
var fs = require("fs");
var exec = require('child_process').exec;


server.get('/', function indexHTML(req, res, next) {
        fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            next(err);
            return;
        }
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(data);
        next();
    });
});

server.get('/([a-zA-Z.\/])+/', restify.serveStatic({ directory: __dirname, default: 'index.html' }));

var leap = io
    .of('/leap')
    .on('connection', function(socket){
        //send data to client after recieving data   
        socket.on('fingers', function(data){
            var output;                
            exec('python test.py ' + data.fingerData, function callback(error, stdout, stderr){
                socket.emit('date', {'date': stdout});
            });
        })
    });

server.listen(8081, function () {
    console.log('socket.io server listening at %s', server.url);
});
