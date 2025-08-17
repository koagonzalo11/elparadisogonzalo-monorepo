import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.8.2/dist/ethers.min.js";

// Replace with your deployed contract address
const contractAddress = "0xYourContractAddressHere";
// Replace with your contract ABI
const MyContractABI = [
  // Example ABI entries
  "function readValue() view returns (uint256)",
  "function writeValue(uint256 _val)"
];

let provider;

document.getElementById("connectWallet").onclick = async () => {
  if (!window.ethereum) return alert("MetaMask not detected");
  provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  document.getElementById("output").innerText = "Wallet connected!";
};

document.getElementById("readValue").onclick = async () => {
  if (!provider) return alert("Connect your wallet first");
  const contract = new ethers.Contract(contractAddress, MyContractABI, provider);
  const value = await contract.readValue();
  document.getElementById("output").innerText = "Value: " + value;
};

document.getElementById("writeValue").onclick = async () => {
  if (!provider) return alert("Connect your wallet first");
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, MyContractABI, signer);

  try {
    const tx = await contract.writeValue(42); // Replace 42 with your value or input
    document.getElementById("output").innerText = "Transaction sent! Waiting...";
    await tx.wait();
    document.getElementById("output").innerText = "Transaction confirmed!";
  } catch (err) {
    console.error(err);
    alert("Transaction failed");
  }
};

