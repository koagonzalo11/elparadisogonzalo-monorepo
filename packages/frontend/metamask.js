import { MetaMaskSDK } from "@metamask/sdk";

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "Your DApp Name",
    url: window.location.href,
  },
  infuraAPIKey: "429c528a2c524a0ba1fa538343d025b2", // your Infura Project ID
});

const ethereum = MMSDK.getProvider();

async function connectWallet() {
  try {
    // Request user connection to MetaMask wallet
    const accounts = await MMSDK.connect();
    console.log("Connected accounts:", accounts);

    // Optional: fetch accounts via provider request
    const result = await ethereum.request({ method: "eth_accounts" });
    console.log("Accounts from provider:", result);

    // Return accounts or update UI accordingly
    return accounts;
  } catch (error) {
    console.error("Connection to MetaMask failed:", error);
  }
}

// Export or call this function to initiate connection on user action (button click)
export { connectWallet, ethereum };
