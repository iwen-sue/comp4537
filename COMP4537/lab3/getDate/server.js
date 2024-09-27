let message = require('../lang/en/en');
let http = require('http');
let url = require('url');

http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    let name = q.query.name;
    let date = new Date();
    // format date and time to PST
    date.setHours(date.getHours() - 7);
    date = date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    let greeting = message.greeting(name, date);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`<h1 style="color:blue">${greeting}</h1>`);

}).listen(process.env.PORT || 8080);