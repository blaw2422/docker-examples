'use strict';

const config = require('./config');
const http = require('http');

const express = require('express')
const app = express();

const redis = require('redis')
const redisClient = () => redis.createClient(config.redis);
const redisSetCb = (req, res) => (err, reply) => {
	if (err) {
		res.send(err);
		res.sendStatus(500);
	} else {
		res.send("OK");
	}
}

const redisGetCb = (req, res) => (err, reply) => {
	if (err) {
		res.sendStatus(500);
		res.send(err);
	} else {
		res.send(reply);
	}
}

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/redis', (req, res) => redisClient().set(req.query.key, req.query.value, redisSetCb(req, res)));
app.get('/redis', (req, res) => redisClient().get(req.query.key, redisGetCb(req, res)));

app.get('/python', (req, res) => {
const options = {
    host: 'python-service',
    port: 5000,
    path: '/',
    method: 'GET'
};

http.request(options, function(pythonRes) {
    console.log('STATUS: ' + pythonRes.statusCode);
    console.log('HEADERS: ' + JSON.stringify(pythonRes.headers));
    pythonRes.setEncoding('utf8');
    pythonRes.on('data', function (chunk) {
          console.log('BODY: ' + chunk);
          res.send(' from python-service' + chunk);
        });
  }).end();

});
app.listen(8000, () => console.log('Example app listening on port 8000! ooooooohhh   weeee'))
