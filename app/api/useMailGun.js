require('dotenv').config();
var request = require('request');
var axios = require('axios');

const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN_NAME = process.env.DOMAIN_NAME;
const MAILGUN_URL = `https://api:${API_KEY}@api.mailgun.net/v3/${DOMAIN_NAME}/messages`;

const PrepEmail = (subject, body, from, to, cc, bcc) => {

    const email =
    {
        from: from,
        text: body,
        subject: subject
    }

    let arr = to.split(',');

    arr.forEach((value) => {
        email.to = value;
    });

    if (cc !== undefined) {
        arr = cc.split(',');
        arr.forEach((value) => {
            email.cc = value;
        });
    }

    if (bcc !== undefined) {
        arr = bcc.split(',');
        arr.forEach((value) => {
            email.bcc = value;
        });
    }

    return email;
}


var useMailGun = (subject, body, from, to, cc, bcc) => {
    return new Promise((resolve, reject) => {

        const email = PrepEmail(subject, body, from, to, cc, bcc);

        return axios({
            method: 'post',
            url: MAILGUN_URL,
            params: email
        }).then((response) => {
            resolve(response);
        }).catch((e) => {
            reject(e);
        });

    });
}

module.exports = useMailGun;