const { default: Moralis } = require('moralis');
const { getAddress } = require('ethers/lib/utils');
const { NftEvent } = require('../../models/nft-events.model');
const getRedisClient = require('./redis');

const getAndSaveEventsByBlockMoralis = async (
  provider,
  session,
  blockNumber,
) => {
  const rClient = getRedisClient();
  const allNftTransferData = (
    await Moralis.EvmApi.nft.getNFTTransfersByBlock({
      chain: provider.network.chainId,
      blockNumberOrHash: blockNumber,
    })
  ).toJSON();
  const allValidEvents = [];
  for (let jndex = 0; jndex < allNftTransferData.result.length; jndex += 1) {
    const nftTransfer = allNftTransferData.result[jndex];
    const {
      block_number,
      transaction_type,
      token_address,
      token_id,
      amount,
      transaction_hash,
      contract_type,
      from_address,
      to_address,
    } = nftTransfer;
    const knownContract = await rClient.get(getAddress(token_address));
    if (knownContract) {
      allValidEvents.push({
        type:
          transaction_type === 'Single'
            ? contract_type === 'ERC721'
              ? 'Transfer'
              : 'TransferSingle'
            : transaction_type === 'Batch'
              ? 'TransferBatch'
              : transaction_type,
        contractAddress: token_address,
        from: from_address,
        to: to_address,
        tokenId: token_id,
        amount,
        txHash: transaction_hash,
        chainId: provider.network.chainId,
        blockNumber: block_number,
      });
    }
  }
  await NftEvent.insertMany(allValidEvents, { session });
};

module.exports = {
  getAndSaveEventsByBlockMoralis,
};
