let message = require('./lang/en/en');
let http = require('http');
let url = require('url');

http.createServer((req, res) => {
    if (req.url === '/COMP4537/test') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        return res.end('test');
    }
}).listen(process.env.PORT || 8080);