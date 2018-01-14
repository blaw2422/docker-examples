'use strict';

const config = require('./config');

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

app.listen(8000, () => console.log('Example app listening on port 8000! ooooooohhh   weeee'))