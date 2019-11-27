const http = require('http');

function handler(request, response){
console.log(request.url);
response.end("Print no browser!");
}

const server = http.createServer(handler);

server.listen(8080, function() {
    console.log("Server is listenig at port 8080");
});
