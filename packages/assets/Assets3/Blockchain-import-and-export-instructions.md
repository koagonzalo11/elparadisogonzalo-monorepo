# Blockchain Import and Export Instructions

This document provides instructions for importing and exporting blockchain data associated with the following addresses:

- **Ethereum Wallet & Contract**: `0x802ba6a112f4a7bbbc2d63c8ef4bc14dfcbe6245`
- **BNB Smart Chain Contract**: `0xB8c77482e45F1F44dE1745F52C74426C631bDD52`

## Exporting Contract Data

### Ethereum

**Steps:**

1. Go to: https://etherscan.io/address/0x802ba6a112f4a7bbbc2d63c8ef4bc14dfcbe6245
2. Click the **Contract** tab.
3. Copy or download the **ABI** and source code (if verified).
4. To export transactions or logs, use the [Etherscan API](https://docs.etherscan.io/) or tools like `eth-exporter`.

**Optional CLI Export (Hardhat):**
```bash
npx hardhat verify 0x802ba6a112f4a7bbbc2d63c8ef4bc14dfcbe6245 --network mainnet
