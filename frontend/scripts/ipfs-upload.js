// Use top-level ESM import
import PinataSDK from '@pinata/sdk';
import fs from 'fs';
import path from 'path';

// Make sure your environment variables are set
const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;

if (!pinataApiKey || !pinataSecretApiKey) {
  console.error('Please set PINATA_API_KEY and PINATA_SECRET_API_KEY in your environment.');
  process.exit(1);
}

const pinata = new PinataSDK(pinataApiKey, pinataSecretApiKey);

// Path to your build folder
const sourcePath = path.join(process.cwd(), 'dist');

async function upload() {
  try {
    const result = await pinata.pinFromFS(sourcePath, { pinataMetadata: { name: 'elparadisogonzalo-dapp' } });
    console.log('Pinned to IPFS:', result.IpfsHash);
  } catch (err) {
    console.error('Upload failed:', err);
  }
}

upload();

