import pinataSDK from '@pinata/sdk';
import fs from 'fs';
import path from 'path';

const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);

async function main() {
  try {
    // Adjust './dist' if your build output folder is different
    const result = await pinata.pinFromFS(path.resolve('./dist'));

    console.log('CID:', result.IpfsHash);

    // Save CID for workflow use
    fs.writeFileSync('./cid.txt', result.IpfsHash);
  } catch (err) {
    console.error('Pinata upload failed:', err);
    process.exit(1);
  }
}

main();
