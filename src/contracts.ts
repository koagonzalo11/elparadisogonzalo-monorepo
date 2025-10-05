import { ethers } from "ethers";

// Replace with your actual Infura/Alchemy RPC key
const INFURA_KEY = "YOUR_INFURA_KEY";

export const provider = new ethers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_KEY}`
);

// Replace with your real deployed contract address
export const CONTRACT_ADDRESS = "0x4e8c73e7f243d12b7a5571200609523a4890beff";

// Replace with your contract ABI
export const CONTRACT_ABI = [
  "event Transfer(address indexed from, address indexed to, uint256 value)",
];

export const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  provider
);
