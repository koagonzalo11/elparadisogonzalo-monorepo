// sign.js
require("dotenv").config();
const { ethers } = require("ethers");

// Check if private key is set
const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;

if (!PRIVATE_KEY) {
  console.error("❌ No private key found! Please set DEPLOYER_PRIVATE_KEY in your .env file.");
  process.exit(1);
}

console.log("✅ Private key loaded.");

// Create wallet
const wallet = new ethers.Wallet(PRIVATE_KEY);

// Message to sign
const message = "Verified deployment of elparadisogonzalo project";

// Sign message
(async () => {
  try {
    const signature = await wallet.signMessage(message);

    console.log("==================================================");
    console.log(" Elparadisogonzalo Project — Deployment Signature ");
    console.log("==================================================");
    console.log("Message:", message);
    console.log("Wallet Address:", wallet.address);
    console.log("Signature (hex):", signature);
    console.log("==================================================");
  } catch (err) {
    console.error("❌ Error signing message:", err);
  }
})();

