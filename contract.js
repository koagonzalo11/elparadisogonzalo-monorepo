import { ethers } from "ethers";
import MyContractABI from "./abi/MyContract.json";

let provider, signer, contract;

export const initContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not found");
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  contract = new ethers.Contract(
    "0x4e8c73e7f243d12b7a5571200609523a4890beff", 
    MyContractABI, 
    signer
  );
  return contract;
};

export const readValue = async () => {
  if (!contract) await initContract();
  return await contract.someReadFunction(); // replace with your view function
};

export const writeValue = async (param) => {
  if (!contract) await initContract();
  const tx = await contract.someWriteFunction(param); // replace with your function
  await tx.wait();
  return tx;
};
