const { ethers } = require('ethers');
const axios = require('axios');

const INFURA_API_KEY = process.env.INFURA_API_KEY || 'your_infura_key_here';

const chains = [
  {
    name: "Ethereum Mainnet",
    symbol: "ETH",
    rpc: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
    priceApi: "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
    coingeckoId: "ethereum",
  },
  {
    name: "Binance Smart Chain",
    symbol: "BNB",
    rpc: "https://bsc-dataseed.binance.org/",
    priceApi: "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd",
    coingeckoId: "binancecoin",
  },
  {
    name: "Polygon (Matic)",
    symbol: "MATIC",
    rpc: "https://polygon-rpc.com/",
    priceApi: "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd",
    coingeckoId: "matic-network",
  },
  {
    name: "Avalanche C-Chain",
    symbol: "AVAX",
    rpc: "https://api.avax.network/ext/bc/C/rpc",
    priceApi: "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd",
    coingeckoId: "avalanche-2",
  },
  {
    name: "Arbitrum One",
    symbol: "ETH",
    rpc: "https://arb1.arbitrum.io/rpc",
    priceApi: "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
    coingeckoId: "ethereum",
  },
  {
    name: "Optimism",
    symbol: "ETH",
    rpc: "https://mainnet.optimism.io",
    priceApi: "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
    coingeckoId: "ethereum",
  },
  {
    name: "Evmos (EVM)",
    symbol: "EVMOS",
    rpc: "https://eth.bd.evmos.org:8545",
    priceApi: "https://api.coingecko.com/api/v3/simple/price?ids=evmos&vs_currencies=usd",
    coingeckoId: "evmos",
  }
];

async function getPrice(coingeckoId) {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`);
    return response.data[coingeckoId].usd || 0;
  } catch (error) {
    return 0;
  }
}

async function scanChain(chain, wallet) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(chain.rpc);
    await provider.ready;

    const balance = await provider.getBalance(wallet);
    const formattedBalance = Number(ethers.utils.formatEther(balance));
    const price = await getPrice(chain.coingeckoId);
    const valueUsd = (formattedBalance * price).toFixed(2);

    console.log(`--- ${chain.name} ---`);
    console.log(`Balance: ${formattedBalance} ${chain.symbol}`);
    console.log(`Value: $${valueUsd}\n`);
  } catch (error) {
    console.log(`--- ${chain.name} ---`);
    console.log(`❌ Error fetching data: ${error.message}\n`);
  }
}

async function main() {
  const wallet = process.argv[2];
  if (!wallet) {
    console.log("Usage: node multi_chain_scanner.js <wallet_address>");
    return;
  }

  console.log(`🔍 Scanning wallet: ${wallet}\n`);
  for (const chain of chains) {
    await scanChain(chain, wallet);
  }
}

main();

