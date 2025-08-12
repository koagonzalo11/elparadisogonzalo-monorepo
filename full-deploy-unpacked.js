// full-deploy-unpacked.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const { execSync } = require('child_process');

const {
  PINATA_API_KEY,
  PINATA_API_SECRET,
  UD_API_KEY,
  UD_DOMAIN = 'elparadisogonzalo.com',
  FRONTEND_BUILD_CMD = 'npm run build',
  FRONTEND_BUILD_DIR = 'dist'
} = process.env;

if (!PINATA_API_KEY || !PINATA_API_SECRET) {
  console.error('Missing PINATA_API_KEY / PINATA_API_SECRET in env.');
  process.exit(1);
}
if (!UD_API_KEY) {
  console.error('Missing UD_API_KEY in env.');
  process.exit(1);
}

function buildFrontend() {
  console.log('🏗️ Building frontend...');
  execSync(FRONTEND_BUILD_CMD, { stdio: 'inherit' });
  console.log('✅ Build finished.');
}

function walkDir(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      files.push(...walkDir(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function uploadFolderToPinata(folderPath) {
  console.log('📌 Preparing files for Pinata upload...');
  const files = walkDir(folderPath);
  if (files.length === 0) throw new Error('No files found in build folder.');

  const form = new FormData();

  // Append each file and set a filepath relative to the folder root (so Pinata creates a directory)
  const rootFolderName = path.basename(folderPath);
  for (const filePath of files) {
    const rel = path.relative(folderPath, filePath).split(path.sep).join('/'); // use forward slashes
    // filepath: "<rootFolderName>/<relative/path>" -> Pinata will construct a folder
    const filepathForPinata = `${rootFolderName}/${rel}`;
    form.append('file', fs.createReadStream(filePath), { filepath: filepathForPinata });
  }

  // Pinata options: wrapWithDirectory makes a directory CID
  form.append('pinataOptions', JSON.stringify({ cidVersion: 1, wrapWithDirectory: true }));
  // Optional: metadata
  form.append('pinataMetadata', JSON.stringify({ name: `${rootFolderName}-${Date.now()}` }));

  console.log(`📤 Uploading ${files.length} files to Pinata (this may take a bit)...`);
  const resp = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', form, {
    maxBodyLength: Infinity,
    headers: {
      ...form.getHeaders(),
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_API_SECRET,
    },
    timeout: 10 * 60 * 1000, // 10 min
  });

  if (!resp.data || !resp.data.IpfsHash) {
    throw new Error('Pinata responded without IpfsHash: ' + JSON.stringify(resp.data));
  }
  const cid = resp.data.IpfsHash;
  console.log('✅ Pinata upload complete. CID:', cid);
  return cid;
}

async function updateDNSLink(domain, cid) {
  console.log(`🌐 Updating _dnslink for ${domain} -> /ipfs/${cid}`);
  // Using v2 UD endpoint for records
  const url = `https://api.unstoppabledomains.com/v2/domains/${domain}/records/_dnslink`;
  const payload = { value: `/ipfs/${cid}` };

  const res = await axios.put(url, payload, {
    headers: {
      Authorization: `Bearer ${UD_API_KEY}`,
      'Content-Type': 'application/json',
    },
    timeout: 30 * 1000,
  });
  console.log('✅ DNSLink update response:', res.data);
}

(async () => {
  try {
    buildFrontend();

    const folder = path.join(process.cwd(), FRONTEND_BUILD_DIR);
    if (!fs.existsSync(folder)) throw new Error(`Build folder not found: ${folder}`);

    const cid = await uploadFolderToPinata(folder);
    await updateDNSLink(UD_DOMAIN, cid);

    console.log('');
    console.log('🎉 DONE — your site should be available shortly at:');
    console.log(`  • https://ipfs.io/ipfs/${cid}`);
    console.log(`  • https://${UD_DOMAIN}  (after DNS propagation)`);
  } catch (err) {
    console.error('❌ Deployment failed:', err.response?.data || err.message || err);
    process.exit(1);
  }
})();
