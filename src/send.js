#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

let msg = require('./entrada.js');

//console.log('Data dentro do send.js: ');
//console.log(msg);
//var msg;


amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';
        //var msg = 'Eae man kk';

       // let msg = require('./index.js');
        

        //console.log('Data dentro do send.js: ');
        //console.log(msg);
//var msg;

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
