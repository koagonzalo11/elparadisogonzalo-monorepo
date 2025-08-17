#!/usr/bin/env node

/**
 * Update Unstoppable Domain _dnslink record with new CID
 */

import fetch from "node-fetch";

const UD_API_TOKEN = process.env.UD_API_TOKEN; // your Unstoppable Domains API token
const DOMAIN = "elparadisogonzalo.com";        // your domain
const CID = process.argv[2];                   // pass CID as argument

if (!UD_API_TOKEN || !CID) {
  console.error("Usage: UD_API_TOKEN must be set and CID passed as argument.");
  process.exit(1);
}

async function updateDNSLink(cid) {
  const url = `https://api.unstoppabledomains.com/v1/domains/${DOMAIN}/records/_dnslink`;
  const body = { type: "TXT", value: `dnslink=/ipfs/${cid}` };

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${UD_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    console.log(`Updated ${DOMAIN} _dnslink to /ipfs/${cid}`, data);
  } catch (err) {
    console.error("Unstoppable Domains update error:", err);
    process.exit(1);
  }
}

// Main
updateDNSLink(CID);

