const { Interface } = require('ethers/lib/utils');
const mongoose = require('mongoose');
const erc1155 = require('../abis/erc1155');
const erc721 = require('../abis/erc721');

const iface = new Interface([...erc1155, ...erc721]);
const validTopics = {
  TransferSingle: iface.getEventTopic('TransferSingle'),
  TransferBatch: iface.getEventTopic('TransferBatch'),
  URI: iface.getEventTopic('URI'),
  Transfer: iface.getEventTopic('Transfer'),
};

const nftEventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: Object.keys(validTopics),
      required: true,
    },
    contractAddress: {
      type: String,
      required: true,
    },
    from: {
      type: String,
    },
    to: {
      type: String,
    },
    tokenId: {
      type: String,
    },
    amount: {
      type: String,
      default: 1,
    },
    uri: {
      type: String,
    },
    txHash: {
      type: String,
      required: true,
    },
    chainId: {
      type: Number,
      required: true,
    },
    blockNumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const NftEvent = mongoose.model('NftEvent', nftEventSchema);

module.exports = { NftEvent, validTopics };
