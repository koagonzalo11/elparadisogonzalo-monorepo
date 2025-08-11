#!/bin/bash
set -e

# Config
FRONTEND_DIR="./packages/frontend"
DIST_DIR="$FRONTEND_DIR/dist"
UD_DOMAIN="elparadisogonzalo.com"
UD_API_TOKEN="YOUR_UNSTOPPABLE_DOMAINS_API_TOKEN"  # <-- Set your API token here
UD_API_URL="https://api.unstoppabledomains.com/domains"

echo "Starting frontend build..."
npm run build:frontend

echo "Uploading frontend build to IPFS..."
IPFS_CID=$(ipfs add -r -Q "$DIST_DIR")
echo "IPFS CID: $IPFS_CID"

echo "Updating Unstoppable Domain DNSLink record..."
# Prepare JSON payload
read -r -d '' JSON_PAYLOAD <<EOF
{
  "records": {
    "dnslink": "/ipfs/$IPFS_CID"
  }
}
EOF

# Update DNSLink TXT record via UD API
curl -X PATCH "$UD_API_URL/$UD_DOMAIN/records" \
  -H "Authorization: Bearer $UD_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "$JSON_PAYLOAD"

echo "DNSLink updated for $UD_DOMAIN to /ipfs/$IPFS_CID"
echo "Deploy complete! Visit https://$UD_DOMAIN to see your dApp live."
