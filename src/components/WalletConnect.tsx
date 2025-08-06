import { useState } from 'react';
import { ethers } from 'ethers';

export default function WalletConnect() {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const [selectedAccount] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(selectedAccount);
      } catch (err) {
        console.error('User rejected request', err);
      }
    } else {
      alert('MetaMask not detected');
    }
  };

  return (
    <div>
      {account ? (
        <p className="text-teal-700 font-bold">Connected: {account}</p>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded mt-4"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
