# 🧩 Contributing to Elparadisogonzalo-monorepo

Welcome to the **Elparadisogonzalo-monorepo** — powering decentralized apps, smart contracts, monitoring, and infrastructure under a single, modular codebase.  
Whether you're fixing a bug, adding a chain, or improving docs, we appreciate your contribution!

---

## 📦 Monorepo Structure

```txt
elparadisogonzalo-monorepo/
├── packages/
│   ├── contracts/        # Solidity smart contracts
│   ├── backend/          # Node.js APIs + event processors
│   ├── monitor/          # Blockchain indexer & analytics
│   ├── frontend/         # IPFS-hosted dApp interface
│   └── shared/           # Shared utils/configs
├── .github/              # Workflows and automation
├── package.json          # Root dependencies and scripts
└── yarn.lock             # Shared lockfile
✅ How to Contribute
1. Fork & Clone the Repo
git clone https://github.com/Elparadisogonzalo/Elparadisogonzalo-monorepo.git
cd Elparadisogonzalo-monorepo
2. Install All Dependencies
yarn install
# or
npm install
3. Choose a Package to Work
Go to a sub-package (e.g. packages/monitor) and make your changes.
4. Create a Feature Branch
git checkout -b feat/<package>/<description>
5. Commit Using Conventional Commits
git commit -m "feat(monitor): add Avalanche chain support"
6. Push and Open a Pull Request
git push origin feat/<package>/<description>
Then open a PR against main.
🧪 Dev & Build Commands

Monorepo Tools:
	•	We use workspaces via Yarn or pnpm.

To run scripts in a specific package:
yarn workspace @elparadisogonzalo/monitor start
To build all packages:
yarn build
yarn workspace @elparadisogonzalo/contracts test
To test a specific package:
yarn workspace @elparadisogonzalo/contracts test
🔍 Contribution Areas
Area
Tech Stack
Location
Smart Contracts
Solidity, Hardhat
packages/contracts/
APIs & Backend
Node.js, Ethers.js, Web3.js
packages/backend/
Monitoring
Python, CSV, Parquet, Geth
packages/monitor/
Frontend
HTML/CSS, React, MetaMask
packages/frontend/
IPFS/Deployment
GitHub Actions, Pinata, UD API
.github/workflows/
Shared Utils
JS/TS modules, env configs
packages/shared/
🧠 Guidelines
	•	Keep code modular and documented
	•	Reuse shared utilities in packages/shared/
	•	Match existing lint and formatting rules
	•	Include tests if applicable
💬 Community
	•	Report bugs via GitHub Issues
	•	Discuss improvements in Pull Requests
	•	For private concerns, contact: azehagowa@gmail.com
	•	See CODE_OF_CONDUCT.md
📜 Licensing

All contributions are licensed under the MIT License.
By submitting a pull request, you agree to license your work under the same.
Thank you for building the decentralized future with us. 🚀


