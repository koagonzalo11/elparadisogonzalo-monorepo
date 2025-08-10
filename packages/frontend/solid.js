import { createSignal } from "solid-js";
import { ethers } from "ethers";
const walletAddress = "0x802ba6a112f4a7bbbc2d63c8ef4bc14dfcbe6245"; // Your wallet
export default function TipButton() {
  const [txStatus, setTxStatus] = createSignal("");
  async function tip(amountEth: string) {
    try {
      if (!window.ethereum) {
        setTxStatus("MetaMask not installed");
        return;
      }
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tx = await signer.sendTransaction({
        to: walletAddress,
        value: ethers.utils.parseEther(amountEth),
      });
      setTxStatus("Transaction sent! Waiting for confirmation...");
      await tx.wait();
      setTxStatus("Thanks for your tip!");
    } catch (error) {
      setTxStatus("Error: " + error.message);
    }
  }
  return (
    <>
      <button onClick={() => tip("0.01")}>Tip 0.01 ETH</button>
      <button onClick={() => tip("0.05")}>Tip 0.05 ETH</button>
      <button onClick={() => tip("0.1")}>Tip 0.1 ETH</button>
      <p>{txStatus()}</p>
    </>
  );
}
