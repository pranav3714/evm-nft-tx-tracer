const mongoose = require('mongoose');

// Define the Block schema
const blockSchema = new mongoose.Schema(
  {
    blockNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    hash: {
      type: String,
      unique: true,
    },
    timestamp: {
      type: Date,
    },
    parentHash: {
      type: String,
    },
    chainId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Block = mongoose.model('Block', blockSchema);

module.exports = Block;
