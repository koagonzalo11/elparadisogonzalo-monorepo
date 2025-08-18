import fetch from "node-fetch";
import fs from "fs";
import path from "path";

// Load IPFS CID from a local file (written by ipfs-upload.js)
const cidFile = path.resolve("./dist/CID.txt");
if (!fs.existsSync(cidFile)) {
  console.error("CID file not found. Run ipfs-upload.js first.");
  process.exit(1);
}
const cid = fs.readFileSync(cidFile, "utf8").trim();

// UD API credentials from environment
const UD_API_KEY = process.env.UD_API_KEY;
const UD_API_SECRET = process.env.UD_API_SECRET;

if (!UD_API_KEY || !UD_API_SECRET) {
  console.error("Please set UD_API_KEY and UD_API_SECRET in environment.");
  process.exit(1);
}

// Construct API request
const domain = "elparadisogonzalo.com";
const url = `https://unstoppabledomains.com/api/v1/domains/${domain}/records`;
const data = {
  "_dnslink": `/ipfs/${cid}`
};

async function updateUD() {
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`${UD_API_KEY}:${UD_API_SECRET}`).toString("base64")}`
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`UD API Error: ${res.status} ${text}`);
    }

    console.log(`UD record updated successfully: _dnslink -> ${cid}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

updateUD();

