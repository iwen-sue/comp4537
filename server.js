let message = require('./lab3/lang/en/en');
let http = require('http');
let url = require('url');

http.createServer((req, res) => {
    console.log('Incoming request:', req.url);
    // if (req.url === '/COMP4537/test') {
    //     res.writeHead(200, {'Content-Type': 'text/html'});
    //     return res.end('test');
    // }
}).listen(80);