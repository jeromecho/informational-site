const http = require('http');
const fs = require('fs/promises');
const { URL } = require('node:url');

http.createServer(async function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(await selectContent(req.url));
}).listen(8080);

const selectContent = async (url) => {
    let prevContent = './index.html';
    switch (url) {
        case '/': 
            prevContent = './index.html';
            return fs.readFile('./index.html', 'utf8');
        case '/about': 
            prevContent = './about.html';
            return fs.readFile('./about.html', 'utf8');
        case '/contact': 
            prevContent = './contact-me.html';
            return fs.readFile('./contact-me.html', 'utf8');
        case '/404': 
            prevContent = './404.html';
            return fs.readFile('./404.html', 'utf8');
        default:
            // for /favicon.ico request
            return fs.readFile(prevContent, 'utf8');
    }
};

const readFile = async (path, encoding) => {
    const result = fs.readFile(path, encoding, (err, data) => {
        if (err) {
            console.error('Error in reading file');
            return;
        }
        return data;
    });
}
