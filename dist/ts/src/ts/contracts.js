import { wallet } from "./wallet";
import contractABI from "./abi/YourContract.json"; // Add your ABI JSON here
const contractAddress = "0xYourContractAddressHere";
export const contract = new ethers.Contract(contractAddress, contractABI, wallet);
//# sourceMappingURL=contracts.js.map