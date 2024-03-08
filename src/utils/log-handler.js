const { Interface, getAddress } = require('ethers/lib/utils');
const getRedisClient = require('./redis');
const { validTopics } = require('../../models/nft-events.model');
const erc1155 = require('../../abis/erc1155');
const erc721 = require('../../abis/erc721');

const iface = new Interface([...erc1155, ...erc721]);
const logHandler = async (log, evmProvider) => {
  const {
    address, data, topics, transactionHash, blockNumber,
  } = log;
  const Address = getAddress(address);
  const rClient = await getRedisClient();
  const knownContract = await rClient.get(Address);
  const validTopicSigs = Object.values(validTopics);
  if (knownContract) {
    try {
      if (topics.includes(validTopicSigs[0])) {
        console.log('its TransferSingle');
        const transferInfo = iface.decodeEventLog(
          'TransferSingle',
          data,
          topics,
        );
        return {
          amount: transferInfo.value.toString(),
          contractAddress: Address,
          from: transferInfo.from,
          to: transferInfo.to,
          tokenId: transferInfo.id.toString(),
          type: 'TransferSingle',
          txHash: transactionHash,
          chainId: evmProvider.network.chainId,
          blockNumber,
        };
      }
      if (topics.includes(validTopicSigs[1])) {
        console.log('its TransferBatch');
        const batchTransferInfo = iface.decodeEventLog(
          'TransferBatch',
          data,
          topics,
        );
        const additionalData = {
          contractAddress: Address,
          from: batchTransferInfo.from,
          to: batchTransferInfo.to,
          type: 'TransferBatch',
          txHash: transactionHash,
          blockNumber,
        };
        const tokens = batchTransferInfo.ids.map((id, index) => ({
          tokenId: id,
          amount: batchTransferInfo[4][index],
          chainId: evmProvider.network.chainId,
          blockNumber,
          ...additionalData,
        }));
        return tokens;
      }
      if (topics.includes(validTopicSigs[2])) {
        console.log('its URI');
        const uriEvent = iface.decodeEventLog('URI', data, topics);
        return {
          contractAddress: Address,
          txHash: transactionHash,
          tokenId: uriEvent.id.toString(),
          type: 'URI',
          uri: uriEvent.value,
          chainId: evmProvider.network.chainId,
          blockNumber,
        };
      }
      if (topics.includes(validTopicSigs[3])) {
        console.log('its Transfer');
        const transfer721 = iface.decodeEventLog('Transfer', data, topics);
        return {
          contractAddress: Address,
          txHash: transactionHash,
          from: transfer721.from,
          to: transfer721.to,
          tokenId: transfer721.tokenId.toString(),
          type: 'Transfer',
          chainId: evmProvider.network.chainId,
          blockNumber,
        };
      }
    } catch (error) {
      console.log(error, transactionHash);
    }
  }
};

module.exports = {
  logHandler,
};
