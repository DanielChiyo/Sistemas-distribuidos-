var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Arquivos estáticos na pasta public
app.use(express.static('public'));

//Setup socket
var io = socket(server);
//cada cliente tem um socket diferente para conectar com o servidor

// Ouve clientes
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);

    //Lida com evento de chat (send)
    socket.on('chat', function(data){
        /*console.log('Data enviada para o send.js: ');
        console.log(data.message);
        let msg = data.message; //let se mantém entre os arquivos
        //console.log('let msg');
        //console.log(msg);
        //module.exports = msg; //exporta data para o send que vai mandar para o rabbit
        var data_recebida = require('./receive.js'); //depois de colocada na fila é recebida essa mensagem
        //a partir da fila
        console.log('Data recebida do receive.js: ');
        console.log(data_recebida);
        data.message = data_recebida;
        */
        io.sockets.emit('chat', data);
        console.log(data);
    });

    // Lida com evento de digitar
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
        //reenvia a mensagem recebida a todos os sockets conectador
    });

});