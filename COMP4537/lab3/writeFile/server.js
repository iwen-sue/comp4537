let http = require('http');
let url = require('url');
let fs = require('fs');

http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    let text = q.query.text;
    
    if (text) {
        fs.appendFile('file.txt', text + '\n', (err) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end('404 Not Found');
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('Text written to file');
        });
    } 
}).listen(process.env.PORT || 8080);
