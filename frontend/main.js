import { ethers } from "ethers";
import MyContractABI from "./contracts/MyContract.json" assert { type: "json" };

// Detect MetaMask
const provider = window.ethereum ? new ethers.BrowserProvider(window.ethereum) : null;

const connectBtn = document.getElementById("connectWallet");
connectBtn.onclick = async () => {
    if (!provider) return alert("MetaMask not detected");
    await provider.send("eth_requestAccounts", []);
    alert("Wallet connected!");
};

// Replace with your deployed contract address
const contractAddress = "0xYourContractAddressHere";

// Read value from the smart contract
const readBtn = document.getElementById("readValue");
readBtn.onclick = async () => {
    if (!provider) return alert("MetaMask not detected");

    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, MyContractABI, signer);

    try {
        const value = await contract.yourReadFunction(); // replace with your contract function
        alert("Value from contract: " + value);
    } catch (err) {
        console.error(err);
        alert("Error reading contract value");
    }
};

