require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    goerli: {
      url: process.env.INFURA_URL || process.env.ALCHEMY_URL,  // RPC endpoint
      accounts: [process.env.PRIVATE_KEY], // deployer key
    },
    mumbai: {
      url: process.env.MUMBAI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

