const { startSession } = require('mongoose');
const Block = require('../../models/block.model');
const { missingBlockPipeline } = require('../../pipelines');
const { getProvider } = require('../utils/providers');
const { checkContractType } = require('../utils/contracts');
const getRedisClient = require('../utils/redis');
const {
  NftContract,
  contractTypes,
} = require('../../models/nft-contract.model');
const { tracer_locks } = require('../utils/locker');
// const { getAndSaveEventsByBlockMoralis } = require('../utils/moralis');
const { getAndSaveEventsByBlockAlchemy } = require('../utils/alchemy');
const { sleep } = require('../utils/common');

const provider = getProvider();

const fixMissingBlocks = async () => {
  const rClient = await getRedisClient();
  if (tracer_locks.active) {
    return;
  }
  tracer_locks.active = true;
  const { missingBlocks } = (await Block.aggregate(missingBlockPipeline))[0];
  if (missingBlocks.length) {
    console.log('Nothing to catchup!');
  } else {
    console.log(`${missingBlocks.length} blocks out of sync. Trying to catchup!`);
  }
  for (let index = 0; index < missingBlocks.length; index += 1) {
    let session;
    try {
      const promisePipeline = [];
      session = await startSession();
      session.startTransaction();
      const blockNumber = missingBlocks[index];
      console.log(`Syncing block: ${blockNumber}`);
      const blockInfoWithTxns = await provider.getBlockWithTransactions(
        blockNumber,
      );
      const newBlock = new Block({
        blockNumber,
        chainId: provider.network.chainId,
        hash: blockInfoWithTxns.hash,
        parentHash: blockInfoWithTxns.parentHash,
        timestamp: blockInfoWithTxns.timestamp * 1e3,
      });
      await newBlock.save({ session });
      const contractTransactions = blockInfoWithTxns.transactions.filter(
        ({ creates }) => creates,
      );
      for (
        let contractIndex = 0;
        contractIndex < contractTransactions.length;
        contractIndex += 1
      ) {
        const cTxn = contractTransactions[contractIndex];
        promisePipeline.push(checkContractType(cTxn, provider));
      }
      const allContracts = await Promise.all(promisePipeline);
      const allNftContracts = allContracts
        .filter(({ isERC1155, isERC721 }) => isERC1155 || isERC721)
        .map((contractInfo) => ({
          ...contractInfo,
          contractType: contractInfo.isERC1155
            ? contractTypes.ERC1155
            : contractTypes.ERC721,
        }));

      allNftContracts.forEach((contractDetails) => {
        rClient.set(
          contractDetails.contractAddress,
          JSON.stringify(contractDetails),
        );
      });
      await NftContract.insertMany(allNftContracts, { session });
      // await getAndSaveEventsByBlockMoralis(provider, session, blockNumber);
      await getAndSaveEventsByBlockAlchemy(
        provider,
        session,
        blockInfoWithTxns.hash,
      );
      await session.commitTransaction();
      await session.endSession();
      await sleep(1000);
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      await session.endSession();
    }
  }
  tracer_locks.active = false;
};

module.exports = {
  fixMissingBlocks,
};
