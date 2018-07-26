'use strict';
const {UsersHandler} = require('./dao/handler');
const fs = require('fs');
const pdf = require('pdfkit');
const stream = require('stream');

module.exports = (server) => {
    server.get('/', (req, res, next) => {
        res.send('Hello!');
    });
    server.get('/createPdf', async function (req, res, next) {
        let firstName = req.query.firstName;
        if (!firstName) {
            res.send('Bad request');
        }
        let user = await UsersHandler.getByName(firstName);
        if (!user) {
            res.send('User not found');
        }
        await createPdf(user, res);
    });

    async function createPdf(user, res) {
        const converter = new stream.PassThrough();
        let doc = new pdf;
        doc.pipe(converter);
        let data = [];
        converter.on('data', (chunk) => {
            data.push(chunk);
        });
        converter.on('end', async function () {
            let bufer = Buffer.concat(data);
            UsersHandler.updatePdfById(user.id, bufer)
                .then(() => res.send(true))
                .catch(() => res.send(false))
        });
        doc.font('Times-Roman')
            .fontSize(48)
            .text(user.firstName + ' ' + user.lastName)
            .image(user.image, 250, 150, {height: 100});
        doc.end();
    }
};
