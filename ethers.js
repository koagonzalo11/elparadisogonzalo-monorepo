const { ethers } = require("ethers");

// Load your wallet
const wallet = new ethers.Wallet("0x175d7bc38d4164a5162d92938f15569fe6f49087b691a366aecd3fe40fd9b21b");

// Define the message
const message = "Verified deployment of elparadisogonzalo project";

(async () => {
  const signature = await wallet.signMessage(message);
  console.log("Signature (hex):", signature);
})();

