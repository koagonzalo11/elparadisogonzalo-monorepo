import React from "react";
import { useBinanceWallet } from "./utils/useBinanceWallet";

function App() {
  const isBinanceWalletConnected = useBinanceWallet();

  return (
    <div>
      <h1>My DApp</h1>
      {isBinanceWalletConnected ? (
        <p>Binance Chain Wallet is connected ✅</p>
      ) : (
        <p>Please connect your Binance Chain Wallet 🔌</p>
      )}
    </div>
  );
}

export default App;
