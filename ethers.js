async function sendTokens(recipient, amount) {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const tokenAddress = "<YOUR_TOKEN_CONTRACT_ADDRESS>";
  const tokenABI = [ 
    "function transfer(address to, uint amount) returns (bool)",
    "function decimals() view returns (uint8)"
  ];

  const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);

  const decimals = await tokenContract.decimals();
  const amountInWei = ethers.utils.parseUnits(amount.toString(), decimals);

  try {
    const tx = await tokenContract.transfer(recipient, amountInWei);
    console.log("Transaction sent:", tx.hash);

    await tx.wait();
    console.log("Transaction confirmed");

    alert("Tokens sent successfully!");
  } catch (error) {
    console.error("Error sending tokens:", error);
    alert("Failed to send tokens: " + error.message);
  }
}
