async function sendTokens(recipient, amount) {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return;
  }

  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const tokenAddress = "0x4e8c73e7f243d12b7a5571200609523a4890beff";
    const tokenABI = [ 
      "function transfer(address to, uint amount) returns (bool)",
      "function decimals() view returns (uint8)"
    ];

    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);

    const decimals = await tokenContract.decimals();
    const amountInWei = ethers.utils.parseUnits(amount.toString(), decimals);

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

