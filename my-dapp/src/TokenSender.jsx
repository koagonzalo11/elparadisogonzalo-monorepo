import React, { useState } from "react";
import { ethers } from "ethers";

export default function TokenSender() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  async function sendTokens() {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    try {
      setStatus("Requesting wallet access...");
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const tokenAddress = "<YOUR_TOKEN_CONTRACT_ADDRESS>";
      const tokenABI = [
        "function transfer(address to, uint amount) returns (bool)",
        "function decimals() view returns (uint8)",
      ];

      const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);

      setStatus("Fetching token decimals...");
      const decimals = await tokenContract.decimals();

      const amountInWei = ethers.utils.parseUnits(amount, decimals);

      setStatus("Sending transaction...");
      const tx = await tokenContract.transfer(recipient, amountInWei);
      setStatus(`Transaction sent: ${tx.hash}`);

      await tx.wait();
      setStatus("Transaction confirmed! Tokens sent successfully.");
    } catch (error) {
      console.error(error);
      setStatus(`Error: ${error.message || error}`);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Send Tokens</h2>
      <input
        type="text"
        placeholder="Recipient address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />
      <button onClick={sendTokens} disabled={!recipient || !amount}>
        Send Tokens
      </button>
      <p>{status}</p>
    </div>
  );
}
