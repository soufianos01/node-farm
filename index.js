const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    if(!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    } else {
        output = output.replace(/{%NOT_ORGANIC%}/g, '');
    }
    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);



const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el));
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    } else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const id = query.id;
        const output = replaceTemplate(tempProduct, dataObj[id]);
        res.end(output);
    } else if (pathname === '/API') {
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