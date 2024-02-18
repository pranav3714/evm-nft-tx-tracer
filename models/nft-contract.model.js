const mongoose = require('mongoose');

const contractTypes = {
  ERC1155: 'ERC1155',
  ERC721: 'ERC721',
};
const nftContractSchema = new mongoose.Schema(
  {
    contractAddress: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    symbol: {
      type: String,
    },
    supply: {
      type: String,
    },
    baseURI: {
      type: String,
    },
    contractURI: { type: String },
    contractType: {
      type: String,
      required: true,
      enum: Object.keys(contractTypes),
    },
    from: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
      unique: true,
    },
    blockNumber: {
      type: Number,
      required: true,
    },
    chainId: {
      type: Number,
      required: true,
    },
    deletedOn: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const NftContract = mongoose.model('NftContract', nftContractSchema);

module.exports = { NftContract, contractTypes };
