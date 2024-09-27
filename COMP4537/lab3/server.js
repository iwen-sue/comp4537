let message = require('./lang/en/en');
let http = require('http');
let url = require('url');

http.createServer((req, res) => {
    if (req.url === '/COMP4537/lab3/getDate') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        return res.end('getDate');
    } if (req.url === '/COMP4537/lab3/writeFile') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        return res.end('writeFile');
    }

}).listen(process.env.PORT || 8080);