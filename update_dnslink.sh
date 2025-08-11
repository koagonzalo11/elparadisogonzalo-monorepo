#!/bin/bash

# Usage: ./update_dnslink.sh <domain> <ipfs_cid> <api_token>

DOMAIN=$1
IPFS_CID=$2
API_TOKEN=$3

if [ -z "$DOMAIN" ] || [ -z "$IPFS_CID" ] || [ -z "$API_TOKEN" ]; then
  echo "Usage: $0 <domain> <ipfs_cid> <api_token>"
  exit 1
fi

echo "Updating DNSLink for domain: $DOMAIN to IPFS CID: $IPFS_CID"

curl -X PATCH "https://api.unstoppabledomains.com/domains/$DOMAIN/records" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"records\": {
      \"dnslink\": \"/ipfs/$IPFS_CID\"
    }
  }"

echo -e "\nDNSLink update request sent."
