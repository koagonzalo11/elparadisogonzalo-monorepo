import React, { useState, useEffect } from 'react';

export default function WalletConnect() {
  const [account, setAccount] = useState(null);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== 'undefined';
  };

  // Request wallet connection
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      alert('MetaMask is not installed. Please install it to continue.');
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  // Detect account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || null);
      });
    }
  }, []);

  return (
    <div>
      {account ? (
        <p>Connected wallet: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect MetaMask Wallet</button>
      )}
    </div>
  );
}

