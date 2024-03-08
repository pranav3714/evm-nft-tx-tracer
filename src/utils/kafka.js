const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [process.env.KAFKA_HOST],
});
const producer = kafka.producer();
producer.connect();

const publishKafkaEvent = (data) => producer.send({
  topic: 'nft-event',
  messages: [{ value: data }],
});

module.exports = {
  publishKafkaEvent,
};
