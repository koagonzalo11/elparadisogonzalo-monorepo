import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

// Example whitelist of addresses allowed to claim
const whitelistAddresses = [
  '0xabc...123',
  '0xdef...456',
  '0xghi...789',
  // add all allowed addresses here
];

// Hash each address using keccak256
const leafNodes = whitelistAddresses.map(addr => keccak256(addr.toLowerCase()));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

// Get root in hex format (to compare with on-chain)
const rootHash = merkleTree.getRoot().toString('hex');
console.log('Merkle Root:', rootHash);

// Function to get proof for a specific address
export function getMerkleProof(address) {
  const hashedAddress = keccak256(address.toLowerCase());
  const proof = merkleTree.getProof(hashedAddress).map(x => '0x' + x.data.toString('hex'));
  return proof;
}
