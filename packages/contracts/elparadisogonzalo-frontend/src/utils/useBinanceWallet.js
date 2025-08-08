import { useState, useEffect } from "react";

export function useBinanceWallet() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    function checkConnection() {
      if (window.BinanceChain && window.BinanceChain.isConnected()) {
        setIsConnected(true);
        console.log("Binance Chain Wallet is connected");
      } else {
        setIsConnected(false);
        console.warn("Binance Chain Wallet not connected or unavailable");
      }
    }

    // Check on load
    checkConnection();

    // Optionally, listen to connection events
    if (window.BinanceChain) {
      window.BinanceChain.on('connect', () => {
        setIsConnected(true);
        console.log("Binance Chain Wallet connected");
      });
      window.BinanceChain.on('disconnect', () => {
        setIsConnected(false);
        console.warn("Binance Chain Wallet disconnected");
      });
    }

    // Cleanup listeners on unmount
    return () => {
      if (window.BinanceChain) {
        window.BinanceChain.removeListener('connect');
        window.BinanceChain.removeListener('disconnect');
      }
    };
  }, []);

  return isConnected;
}
