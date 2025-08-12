const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');
const archiver = require('archiver');

async function pinFolderToPinata(folderPath) {
  console.log("📌 Zipping build folder...");
  const zipPath = path.join(__dirname, 'dist.zip');
  ...
}

  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', async () => {
      console.log(`✅ Zipped ${archive.pointer()} bytes`);
      try {
        const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
        const data = new FormData();
        data.append('file', fs.createReadStream(zipPath), { filepath: 'dist.zip' });

        const res = await axios.post(url, data, {
          maxBodyLength: Infinity,
          headers: {
            ...data.getHeaders(),
            pinata_api_key: process.env.PINATA_API_KEY,
            pinata_secret_api_key: process.env.PINATA_API_SECRET,
          },
        });

        console.log("✅ Uploaded & pinned to Pinata:", res.data.IpfsHash);
        fs.unlinkSync(zipPath);
        resolve(res.data.IpfsHash);
      } catch (err) {
        console.error("❌ Pinata upload error:", err.response?.data || err.message);
        reject(err);
      }
    });

    archive.on('error', reject);
    archive.directory(folderPath, false);
    archive.pipe(output);
    archive.finalize();
  });
}
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');
const archiver = require('archiver');

async function pinFolderToPinata(folderPath) {
  console.log("📌 Zipping build folder...");
  const zipPath = path.join(__dirname, 'dist.zip');

  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', async () => {
      console.log(`✅ Zipped ${archive.pointer()} bytes`);
      try {
        const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
        const data = new FormData();
        data.append('file', fs.createReadStream(zipPath), { filepath: 'dist.zip' });

        const res = await axios.post(url, data, {
          maxBodyLength: Infinity,
          headers: {
            ...data.getHeaders(),
            pinata_api_key: process.env.PINATA_API_KEY,
            pinata_secret_api_key: process.env.PINATA_API_SECRET,
          },
        });

        console.log("✅ Uploaded & pinned to Pinata:", res.data.IpfsHash);
        fs.unlinkSync(zipPath);
        resolve(res.data.IpfsHash);
      } catch (err) {
        console.error("❌ Pinata upload error:", err.response?.data || err.message);
        reject(err);
      }
    });

    archive.on('error', reject);
    archive.directory(folderPath, false);
    archive.pipe(output);
    archive.finalize();
  });
}

