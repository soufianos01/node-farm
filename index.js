const fs = require('fs');
const http = require('http');
const url = require('url');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;
    console.log(pathName)
    if (pathName === '/' || pathName === '/overview') {
        res.end('Overview');
    } else if (pathName === '/products') {
        res.end('Products');
    } else if (pathName === '/API') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own': 'hello world'
        });
        res.end('404');
    }
    
});

server.listen(8000, () => {
    console.log('miamia')
});