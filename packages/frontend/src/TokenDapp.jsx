import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const tokenAddress = "0xYourTokenContractAddress"; // Replace with your ELP token contract address
const tokenABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function transfer(address to, uint amount) returns (bool)",
];

export default function TokenDapp() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [ethBalance, setEthBalance] = useState("0");
  const [tokenBalance, setTokenBalance] = useState("0");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [decimals, setDecimals] = useState(18);

  // Initialize provider and signer on load or wallet connect
  async function connectWallet() {
    if (!window.ethereum) return alert("Please install MetaMask!");
    const _provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const _signer = _provider.getSigner();
    const _address = await _signer.getAddress();

    setProvider(_provider);
    setSigner(_signer);
    setAddress(_address);

    // Load decimals once
    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, _provider);
    const _decimals = await tokenContract.decimals();
    setDecimals(_decimals);

    refreshBalances(_provider, _address, _decimals);
  }

  async function refreshBalances(_provider, _address, _decimals) {
    // ETH balance
    const balance = await _provider.getBalance(_address);
    setEthBalance(ethers.utils.formatEther(balance));

    // Token balance
    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, _provider);
    const rawTokenBalance = await tokenContract.balanceOf(_address);
    setTokenBalance(ethers.utils.formatUnits(rawTokenBalance, _decimals));
  }

  // Send tokens function
  async function sendTokens(e) {
    e.preventDefault();
    if (!signer) return alert("Connect wallet first!");

    try {
      const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
      const amountInUnits = ethers.utils.parseUnits(amount, decimals);

      const tx = await tokenContract.transfer(recipient, amountInUnits);
      alert(`Transaction sent: ${tx.hash}`);

      await tx.wait();
      alert("Transaction confirmed!");

      refreshBalances(provider, address, decimals);
      setRecipient("");
      setAmount("");
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        connectWallet();
      });
    }
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      {!address ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p>✅ Connected: {address}</p>
          <p>💰 ETH: {ethBalance}</p>
          <p>🎯 Token Balance: {tokenBalance} ELP</p>

          <form onSubmit={sendTokens}>
            <div>
              <label>Recipient address</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
                style={{ width: "100%" }}
              />
            </div>

            <div>
              <label>Amount to send</label>
              <input
                type="number"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                style={{ width: "100%" }}
              />
            </div>

            <button type="submit" style={{ marginTop: 10 }}>
              Send Tokens
            </button>
          </form>
        </>
      )}
    </div>
  );
}
