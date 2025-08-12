require('dotenv').config();
const axios = require('axios');

const {
  PINATA_API_KEY,
  PINATA_API_SECRET,
  UD_API_TOKEN,
  UD_DOMAIN,
  IPFS_CID
} = process.env;

// 1. Pin CID to Pinata
async function pinToPinata(cid) {
  const url = 'https://api.pinata.cloud/pinning/pinByHash';
  const data = { hashToPin: cid };
  const headers = {
    pinata_api_key: PINATA_API_KEY,
    pinata_secret_api_key: PINATA_API_SECRET,
  };

  try {
    const res = await axios.post(url, data, { headers });
    console.log('Pinned to Pinata:', res.data);
  } catch (error) {
    console.error('Pinata pinning error:', error.response?.data || error.message);
  }
}

// 2. Update Unstoppable Domains DNSLink TXT record
async function updateDNSLink(domain, cid) {
  const url = `https://api.unstoppabledomains.com/domain/resolve/${domain}`;
  const updateUrl = `https://api.unstoppabledomains.com/domains/v1/${domain}/records`;

  const dnslinkValue = `/ipfs/${cid}`;

  try {
    // Get current DNS records (optional)
    const currentRecords = await axios.get(updateUrl, {
      headers: { Authorization: `Bearer ${UD_API_TOKEN}` },
    });
    console.log('Current DNS records:', currentRecords.data);

    // Prepare update payload to set TXT record `_dnslink.<domain>`
    const payload = {
      records: {
        '_dnslink': {
          'TXT': dnslinkValue
        }
      }
    };

    const res = await axios.put(updateUrl, payload, {
      headers: {
        Authorization: `Bearer ${UD_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
    });
    console.log('DNSLink updated:', res.data);
  } catch (error) {
    console.error('DNS update error:', error.response?.data || error.message);
  }
}

(async () => {
  await pinToPinata(IPFS_CID);
  await updateDNSLink(UD_DOMAIN, IPFS_CID);
})();
