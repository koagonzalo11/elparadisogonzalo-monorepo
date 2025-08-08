import { ethers } from "hardhat";

async function main() {
  const Lock = await ethers.getContractFactory("Lock");
  const currentBlock = await ethers.provider.getBlockNumber();
  const unlockBlock = currentBlock + 100;  // unlock after 100 blocks

  const lock = await Lock.deploy(unlockBlock, { value: ethers.utils.parseEther("1") });

  await lock.deployed();

  console.log("Lock deployed to:", lock.address);
  console.log("Unlock block number:", unlockBlock);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
