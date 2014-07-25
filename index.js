var express = require('express');
var socket = require('socket.io');

var app = express();
var server = require('http').createServer(app);
var io = socket.listen(server);

server.listen(8080, function () {
    console.log('Server listening at port %d', 8080);
});

io.sockets.on('connection', function(client) {
    console.log("Client connected...");

    client.on('saludar', function(saludo) {
        client.broadcast.emit('saludar', saludo);
    });

    client.on('oanotificacion', function(accion) {
        switch(accion)
        {
            case 'ejecutar':
                client.broadcast.emit('saludar');
                break;
        }
    });
});