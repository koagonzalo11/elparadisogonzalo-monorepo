require('dotenv').config();
const Web3 = require('web3').default || require('web3'); // fix for ESM/CommonJS
const TokenTracker = require('@metamask/eth-token-tracker');

const INFURA_KEY = process.env.INFURA_KEY;
const web3 = new Web3(`https://mainnet.infura.io/v3/${INFURA_KEY}`);

const userAddress = '0x802ba6a112f4a7bbbc2d63c8ef4bc14dfcbe6245'; // your address
const tokenAddress = '0x6b175474e89094c44da98b954eedeac495271d0f'; // DAI
const otherTokenAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'; // USDC

const tokenTracker = new TokenTracker({
  userAddress,
  provider: web3.currentProvider,
  pollingInterval: 8000,
  tokens: [{ address: tokenAddress }]
});

tokenTracker.on('update', (balances) => {
  balances.forEach((bal) => console.log(`Balance of ${bal.symbol}: ${bal.string}`));
});

tokenTracker.add({ address: otherTokenAddress });

// Optional: check initial state
console.log(tokenTracker.serialize());

