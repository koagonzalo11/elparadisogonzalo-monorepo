import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

// Example whitelist addresses with amounts (replace with your actual data)
const whitelist = [
  { address: "0x123...", amount: "1000000000000000000" }, // 1 token in wei
  { address: "0xabc...", amount: "2000000000000000000" },
  // ... more entries
];

// Create leaves: hash of address + amount
const leaves = whitelist.map(({ address, amount }) =>
  keccak256(address.toLowerCase() + amount)
);

const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

export function getMerkleProof(address, amount) {
  const leaf = keccak256(address.toLowerCase() + amount);
  const proof = tree.getHexProof(leaf);
  return proof;
}
