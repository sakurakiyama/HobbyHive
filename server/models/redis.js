const { createClient } = require('redis');

const client = createClient();

async function connectRedis() {
  client.on('error', (error) => {
    console.error('Redis connection failed:', error);
  });

  client.on('ready', () => {
    console.log('Redis connection successful.');
  });

  await client.connect();
  return;
}

connectRedis();

module.exports = { client };
