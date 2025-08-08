# Copilot Onboarding Instructions

## 📌 Repository Overview
This monorepo manages multiple interconnected packages:

- **frontend**: React 19 + Vite 7 SPA for Web3-enabled Chrome Extension and web interface  
- **backend**: Node.js 20+ APIs and services  
- **contracts**: Solidity smart contracts deployed on Ethereum and Binance Smart Chain  
- **my-npm-package** (and others): Utility packages  

The repo aims to deliver a full-stack decentralized app (dApp) with seamless integration between frontend, backend, blockchain, and decentralized hosting.

---

## 🛠 Tech Stack & Runtime

- **Languages**: JavaScript, TypeScript, Solidity  
- **Frontend**: React 19, Vite 7  
- **Backend**: Node.js 20+  
- **Contracts**: Solidity, Hardhat for deployment/testing  
- **Package Management**: npm 10+ with workspaces  
- **Linting**: ESLint with React hooks and TypeScript support  

---

## 🚀 Build, Versioning & Publishing Workflow

### 1. Environment Setup & Authentication

- Always set the environment variable `NPM_TOKEN` with an npm **Read and Publish** token to allow automatic authentication.  
- Write this token to `~/.npmrc` before publish steps:
  ```bash
  echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc
