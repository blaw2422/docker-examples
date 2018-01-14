
const redisDefault = {
	host: 'localhost',
	port: 6379,
};
const redis = {
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
};

module.exports = {
	redis: Object.assign({}, redisDefault, redis),
}