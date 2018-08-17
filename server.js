
require('dotenv').config();
const request = require("request");
const express = require('express');
const bodyParser = require('body-parser');
const useSendGrid = require('./app/api/useSendGrid');
const useMailGun = require('./app/api/useMailGun');
const _ = require('lodash');

const cors = require('cors');
 
var corsOptions = {
    origin: '*',
    exposedHeaders: 'x-auth'
}

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const port = process.env.API_PORT || 3200;

app.get('/', function (req, res) {
    res.status(200).send('api is online');
});

app.post('/email', function (req, res) {
    var email = _.pick(req.body, ['email', 'subject', 'body', 'from', 'to', 'cc', 'bcc']);
    useMailGun(email.subject, email.body, email.from, email.to, email.cc, email.bcc)
        .then((result) => {
            console.log('sucess using MailGun');
            res.status(200).send('email sent');
        }).catch((e) => {
            console.log('failed using MailGun:');
            useSendGrid(email.subject, email.body, email.from, email.to, email.cc, email.bcc).then((results) => {
                console.log('success using SendGrid');
                res.status(200).send('email sent');
            }).catch((e) => {
                console.log('result failed:', e);
                res.status('404').send('sending failed');
            });
        });
});

if(!module.parent)
{
var server = app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
}
module.exports.app = app;
