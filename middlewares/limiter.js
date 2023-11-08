const redis = require('redis');
const RateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');

const { endpointUri, password } = require('../config').redis;

const redisClient = redis.createClient(`redis://${endpointUri}`, { password });

const limiter = new RateLimit({
    store: new RedisStore({
        client: redisClient,
        expiry: 60
    }),
    max: 1,
    windowMs: 60 * 1000
});

module.exports = limiter;


// app.use(limiter);