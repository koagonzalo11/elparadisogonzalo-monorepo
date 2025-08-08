const contractABI = [
  // Full ABI JSON content, including mint, claim, and all other contract methods and events
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      // ... rest of ABI ...
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" },
      { "internalType": "address", "name": "recipient", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // ... rest of ABI entries ...
];

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import logo from "./logo.svg";
import "./App.css";

// Your deployed contract address
const contractAddress = "0x4e8c73e7f243d12b7a5571200609523a4890beff";

// Your contract ABI [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"string","name":"_tokenURI","type":"string"},{"internalType":"bytes32","name":"_merkleRoot","type":"bytes32"},{"internalType":"uint256","name":"_maxTotalMintedSupply","type":"uint256"},{"internalType":"uint256","name":"_originalChainId","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AlreadyClaimed","type":"error"},{"inputs":[],"name":"CannotClaimZero","type":"error"},{"inputs":[],"name":"InvalidProof","type":"error"},{"inputs":[],"name":"Unauthorized","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"CrosschainBurn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"CrosschainMint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"proof","type":"bytes32[]"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"crosschainBurn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"crosschainMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxTotalMintedSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"merkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"originalChainId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"_interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalMintedSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const contractABI = [
  // name()
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  // symbol()
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  // balanceOf(address)
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

function App() {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [contractName, setContractName] = useState("");
  const [contractSymbol, setContractSymbol] = useState("");
  const [balance, setBalance] = useState(null);

  // Connect wallet function
  const connectWallet = async () => {
    try {
      if (window.BinanceChain && window.BinanceChain.isConnected()) {
        const accounts = await window.BinanceChain.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setIsConnected(true);
        await loadContractData(accounts[0]);
      } else {
        alert("Binance Chain Wallet not found or not connected!");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Load contract data (name, symbol, balanceOf)
  const loadContractData = async (userAccount) => {
    try {
      // Create provider and contract instance
      const provider = new ethers.providers.Web3Provider(window.BinanceChain);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      // Call contract methods
      const name = await contract.name();
      const symbol = await contract.symbol();
      const bal = await contract.balanceOf(userAccount);

      setContractName(name);
      setContractSymbol(symbol);
      setBalance(ethers.utils.formatUnits(bal, 18)); // assuming 18 decimals
    } catch (error) {
      console.error("Error loading contract data:", error);
    }
  };

  // Check wallet connection on mount
  useEffect(() => {
    if (window.BinanceChain && window.BinanceChain.isConnected()) {
      window.BinanceChain
        .request({ method: "eth_accounts" })
        .then(async (accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
            await loadContractData(accounts[0]);
          }
        })
        .catch(console.error);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!isConnected ? (
          <button onClick={connectWallet}>Connect Binance Wallet</button>
        ) : (
          <>
            <p>Connected account: {account}</p>
            <p>Contract Name: {contractName}</p>
            <p>Contract Symbol: {contractSymbol}</p>
            <p>Balance: {balance}</p>
          </>
        )}
      </header>
    </div>
  );
}

export default App;










































































































import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import logo from "./logo.svg";
import "./App.css";

const contractAddress = "0x4e8c73e7f243d12b7a5571200609523a4890beff";
const contractABI = [ /* your full ABI here */ ];

function App() {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [contractName, setContractName] = useState("");
  const [contractSymbol, setContractSymbol] = useState("");
  const [balance, setBalance] = useState(null);
  const [txStatus, setTxStatus] = useState("");

  const connectWallet = async () => {
    try {
      if (window.BinanceChain && window.BinanceChain.isConnected()) {
        const accounts = await window.BinanceChain.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setIsConnected(true);
        await loadContractData(accounts[0]);
      } else {
        alert("Binance Chain Wallet not found or not connected!");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const loadContractData = async (userAccount) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.BinanceChain);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const name = await contract.name();
      const symbol = await contract.symbol();
      const bal = await contract.balanceOf(userAccount);
      setContractName(name);
      setContractSymbol(symbol);
      setBalance(ethers.utils.formatUnits(bal, 18));
    } catch (error) {
      console.error("Error loading contract data:", error);
    }
  };

  const mintTokens = async () => {
    try {
      setTxStatus("Waiting for transaction...");
      const provider = new ethers.providers.Web3Provider(window.BinanceChain);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.mint(account, ethers.utils.parseUnits("1", 18)); // mint 1 token
      setTxStatus("Transaction sent. Waiting for confirmation...");
      await tx.wait();
      setTxStatus("Transaction confirmed!");
      await loadContractData(account); // refresh balance
    } catch (error) {
      console.error("Mint transaction failed:", error);
      setTxStatus("Transaction failed: " + (error.message || error));
    }
  };

  useEffect(() => {
    if (window.BinanceChain && window.BinanceChain.isConnected()) {
      window.BinanceChain
        .request({ method: "eth_accounts" })
        .then(async (accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
            await loadContractData(accounts[0]);
          }
        })
        .catch(console.error);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!isConnected ? (
          <button onClick={connectWallet}>Connect Binance Wallet</button>
        ) : (
          <>
            <p>Connected account: {account}</p>
            <p>Contract Name: {contractName}</p>
            <p>Contract Symbol: {contractSymbol}</p>
            <p>Balance: {balance}</p>
            <button onClick={mintTokens}>Mint 1 Token</button>
            <p>{txStatus}</p>
          </>
        )}
      </header>
    </div>
  );
}

export default App;

