var request = require('request');
var dotenv = require('dotenv');
var axios = require('axios');
require('dotenv').config();

const URL = 'https://api.sendgrid.com/v3/mail/send';
const SENDGRID_API_KEY = `Bearer ${process.env.SENDGRID_API_KEY}`; 

const PrepEmail = (subject, body, from, to, cc, bcc) => {

    const arrTo = [];
    const arrCc = [];
    const arrBcc = [];

    const email = {
        "personalizations":
            [{}],
        "from": { "email": from },
        "subject": subject,
        "content": [{ "type": "text/plain", "value": body }]
    }

    let arr = to.split(',');

    if (to !== undefined) {
        arr.forEach((value) => {
            arrTo.push({ "email": value })
        });
        email.personalizations[0]['to'] = arrTo;
    }
    if (cc !== undefined) {
        arr = cc.split(',');
        arr.forEach((value) => {
            arrCc.push({ "email": value })
        });
        email.personalizations[0]['cc'] = arrCc;
    }

    if (bcc !== undefined) {
        arr = bcc.split(',');
        arr.forEach((value) => {
            arrBcc.push({ "email": value })
        });
        email.personalizations[0]['bcc'] = arrBcc;
    }

    return email;
}

var useSendGrid = (subject, body, from, to, cc, bcc) => {
    return new Promise((resolve, reject) => {

        const email = PrepEmail(subject, body, from, to, cc, bcc);

        return axios.post(URL,
            email, {
                headers:
                {
                    'Content-Type': 'application/json',
                    Authorization: SENDGRID_API_KEY
                }
            }).then((response) => {
                resolve(response);
            }).catch((e) => {
                reject(e);
            });
    });
}

module.exports = useSendGrid;