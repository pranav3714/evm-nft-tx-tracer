const { providers } = require('ethers');

const getProvider = (index = 1) => {
  const provider = new providers.JsonRpcProvider(
    index === 1 ? process.env.RPC_URL : process.env.RPC2_URL,
  );
  return provider;
};

module.exports = {
  getProvider,
};
