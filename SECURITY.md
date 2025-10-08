# 🔒 Security Policy

## 📌 Supported Versions

We maintain the latest `main` and `develop` branches. Only the latest release is actively supported with security updates.

| Version | Supported          |
|---------|--------------------|
| main    | ✅ Yes (latest)     |
| develop | ⚠️ Yes (pre-release)|
| others  | ❌ No               |

---

## 🧑‍💻 Reporting a Vulnerability

If you discover a vulnerability in any part of the Elparadisogonzalo ecosystem:

1. **DO NOT open a public issue.**
2. Please report it **privately and responsibly** via email:
   - 📧 **azehagowa@gmail.com**
3. Include:
   - Reproduction steps (if any)
   - Affected component (e.g., smart contract, API endpoint, frontend)
   - Severity level

We aim to respond **within 48 hours**.

---

## 🔐 Security Practices

- ✅ Smart contracts are verified and deployed with transparent ABIs.
- ✅ MetaMask integration uses secure Web3 injection only on user interaction.
- ✅ Wallet private keys are never exposed in code or logs.
- ✅ CI/CD pipelines include static code scanning and test coverage checks.
- ✅ IPFS content hashes (CIDs) are validated before domain updates.
- ✅ Domain ownership is verified through `openai-domain-verification`.

---

## 🧪 Audits & Tooling

- 🔍 Static analysis via `slither`, `mythx`, and `solhint`
- ✅ CI check using `hardhat test`, `solc`, and `dependabot.yml`
- 🧰 Linting: ESLint + Prettier for JS/TS; Solidity formatting via `prettier-plugin-solidity`
- 🧪 GitHub Actions run automated test & build checks on PRs
- 🔐 OpenZeppelin libraries are used for trusted smart contract patterns

---

## 🔄 Responsible Disclosure Timeline

- [ ] Acknowledge report (within 48h)
- [ ] Investigate and reproduce
- [ ] Patch vulnerability
- [ ] Publish CVE advisory or changelog note
- [ ] Credit researcher (if desired)

---

## 🙏 Thanks

We appreciate ethical hackers and researchers who help secure the Elparadisogonzalo ecosystem.

---
