// src/contracts.ts
import { ethers } from "ethers";
// Example: connect to Ethereum provider and contract
const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_KEY");
const contractAddress = "0xYourContractAddressHere";
const abi = [
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "event Approval(address indexed owner, address indexed spender, uint256 value)"
];
export const contract = new ethers.Contract(contractAddress, abi, provider);
//# sourceMappingURL=contracts.js.map