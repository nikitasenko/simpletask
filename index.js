'use strict';

const config = require('config');
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const packageJson = require('./package.json');
const port = config.get('server.port');

let server = restify.createServer({
    name: packageJson.name,
    version: packageJson.version,
});

const cors = corsMiddleware(config.get('server.cors'));

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.authorizationParser());
server.use(restify.plugins.dateParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.requestLogger());
server.use(restify.plugins.bodyParser({ mapFiles: true }));

server.on('MethodNotAllowed', (req, res) => {

    if (req.method.toLowerCase() === 'options') {
        let allowHeaders = config.get('server.cors.allowHeaders');

        if (res.methods.indexOf('OPTIONS') === -1) {
            res.methods.push('OPTIONS');
        }

        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
        res.header('Access-Control-Allow-Methods', req.header('Access-Control-Request-Method'));
        res.header('Access-Control-Allow-Origin', req.headers.origin);

        return res.send('Not content');
    }

    return res.send('METHOD NOT ALLOWED');
});

server.listen(port, () => {
    console.log(`${server.name} listening at ${server.url}`);
});

require('./router')(server);

module.exports = server;
