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
        console.log(" ");
    });
});

var leap = io
    .of('/leap')
    .on('connection', function(socket){
        //send data to client after recieving data   
        socket.on('fingers', function(data){
            var output;                
            // console.log("------------------------------------");
            
            console.log(data.fingerData);
            exec('python test.py ' + data.fingerData, function callback(error, stdout, stderr){
                console.log(stdout);
                output = stdout;
            });

            socket.emit('date', {'date': new Date()}); 
        })
    });

server.listen(8081, function () {
    console.log('socket.io server listening at %s', server.url);
});