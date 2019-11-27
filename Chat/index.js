/*var express = require('express');
var socket = require('socket.io');

//setup
var app = express();
var server = app.listen(4000, function(){
    console.log('Ouvindo requisições na porta 4000');
 });    

 //Arquivos estáticos
 app.use(express.static('public'));
 
 //Setup dos Sockets
 var io = socket(server); // socket.io funciona no servidor server
 //socket backend
//cada cliente tem um socket diferente para conectar com o servidor

 io.on('connection', function(socket){  
    console.log('Conexão socket feita!', socket.id)

    //ouvir o cliente
    socket.on('chat', function(data){
      io.sockets.emit('chat', data);  //todos os sockets conectados ao servidor
      //reenvia a mensagem recebida a todos os sockets conectador
    }); //data vem do socket event
 });

 */

 
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

// Ouve clientes
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    //Lida com evento de chat
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
        console.log(data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});