let http = require('http');
let url = require('url');
let fs = require('fs');

http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    let pathname = `../writeFile/${q.pathname}`;

    fs.readFile(pathname, (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end('404 Not Found');
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
    
    
}).listen(process.env.PORT || 8080);