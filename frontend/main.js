import { ethers } from "ethers";

document.querySelector('#connect').onclick = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    document.getElementById('status').textContent = `Connected: ${await signer.getAddress()}`;
  } else {
    alert("MetaMask not detected");
  }
};
