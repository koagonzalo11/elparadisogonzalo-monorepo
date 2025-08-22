import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`);
const wallet = new ethers.Wallet(process.env.ETHEREUM_PRIVATE_KEY, provider);
export { provider, wallet };
//# sourceMappingURL=wallet.js.map