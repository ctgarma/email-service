const expect =require('expect'); 
const request=require('supertest');

const app = require('./../../server').app;

it('should return response', (done) =>{
    request(app)
    .get('/')
    .expect(200)
    .expect('api is online')
    .end(done);
});

it('route /mail should return response', (done) =>{
    request(app)
    .post('/mail')
    .expect(404)
    .end(done);
});

it('route /email should succeed in sending emails with multiple cc, bcc and to', function (done) {
    this.timeout(10000)
    request(app)
    .post('/email').send({
        "subject":"this is using request",
        "body":"this is the body",
        "to": "sample@gmail.com,sample121@gmail.com",
        "from": "sample@gmail.com",
        "cc": "cample@gmail.com, sample2@gmail.com",
        "bcc": "dample@gmail.com, sample32@gmail.com"         
    })
    .expect(200)
    .end(done);
});

it('route /email should succeed in sending email without bcc and cc', function (done) {
    this.timeout(10000)
    request(app)
    .post('/email').send({
        "subject":"This is using axios",
        "body":"this is the body",
        "to": "sample@gmail.com,sample89@gmail.com",
        "from": "sampl88e@gmail.com"              
    })
    .expect(200)
    .end(done);
});

