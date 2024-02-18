const { createClient } = require('redis');

let redisClient;
const getRedisClient = async () => {
  if (redisClient) return redisClient;
  const client = createClient();
  client.on('error', (err) => console.log('Redis Client Error', err));
  redisClient = await client.connect();
  return redisClient;
};
module.exports = getRedisClient;
