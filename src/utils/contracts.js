const { Multicall } = require('ethereum-multicall');
const supportsInterface = require('../../abis/supportsInterface');
const erc721 = require('../../abis/erc721');
const erc1155 = require('../../abis/erc1155');
const common = require('../../abis/common');

const checkContractType = async (cTxn, provider) => {
  const {
    from, hash, blockNumber, chainId,
  } = cTxn;
  const contractAddress = cTxn.creates;
  try {
    const multicall = new Multicall({
      ethersProvider: provider,
      tryAggregate: true,
    });
    const results = await multicall.call({
      reference: 'contract',
      contractAddress,
      abi: [...supportsInterface, ...erc721, ...erc1155, ...common],
      calls: [
        {
          reference: 'supportsInterfaceERC1155',
          methodName: 'supportsInterface',
          methodParameters: ['0xd9b67a26'],
        },
        {
          reference: 'supportsInterfaceERC721',
          methodName: 'supportsInterface',
          methodParameters: ['0x80ac58cd'],
        },
        {
          reference: 'name',
          methodName: 'name',
          methodParameters: [],
        },
        {
          reference: 'symbol',
          methodName: 'symbol',
          methodParameters: [],
        },
        {
          reference: 'baseURI',
          methodName: 'baseURI',
          methodParameters: [],
        },
      ],
    });
    const returnContext = results.results.contract.callsReturnContext;
    return {
      contractAddress,
      isERC1155:
        returnContext.find(
          ({ reference }) => reference === 'supportsInterfaceERC1155',
        ).returnValues[0] || false,
      isERC721:
        returnContext.find(
          ({ reference }) => reference === 'supportsInterfaceERC721',
        ).returnValues[0] || false,
      name: returnContext.find(({ reference }) => reference === 'name')
        .returnValues[0],
      symbol: returnContext.find(({ reference }) => reference === 'symbol')
        .returnValues[0],
      baseURI: returnContext.find(({ reference }) => reference === 'baseURI')
        .returnValues[0],
      from,
      hash,
      blockNumber,
      chainId,
    };
  } catch (error) {
    console.log(error);
    return {
      contractAddress,
      isERC1155: false,
      isERC721: false,
      from,
      hash,
      blockNumber,
      chainId,
    };
  }
};

module.exports = {
  checkContractType,
};
