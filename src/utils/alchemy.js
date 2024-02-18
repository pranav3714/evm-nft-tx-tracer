const { Alchemy } = require('alchemy-sdk');
const { logHandler } = require('./log-handler');
const { NftEvent } = require('../../models/nft-events.model');
const { flattenArray } = require('./common');

const getAndSaveEventsByBlockAlchemy = async (provider, session, blockHash) => {
  const alSDK = new Alchemy({
    url: process.env.RPC2_URL,
  });
  const { receipts } = await alSDK.core.getTransactionReceipts({
    blockHash,
  });
  for (let index = 0; index < receipts.length; index += 1) {
    const receipt = receipts[index];
    const docOrDocs = receipt.logs.map((log) => logHandler(log, provider));
    const transferEvents = (await Promise.all(docOrDocs)).filter((va) => va);
    if (transferEvents.length === 0) {
      continue;
    }
    await NftEvent.insertMany(flattenArray(transferEvents), { session });
  }
};

module.exports = {
  getAndSaveEventsByBlockAlchemy,
};
