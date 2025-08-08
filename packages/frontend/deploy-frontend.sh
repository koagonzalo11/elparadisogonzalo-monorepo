#!/bin/bash

# Build frontend for production
npm run build:prod

# Upload dist folder to IPFS or your host (replace with your actual upload command)
ipfs add -r dist

# Get the latest CID (you might parse output here)
CID=$(ipfs add -r dist | tail -n1 | awk '{print $2}')

echo "Uploaded to IPFS with CID: $CID"

# Update your Unstoppable Domain DNSLink or hosting config with new CID
# Example (replace with real command or API call):
# unstoppable domains api update --domain elparadisogonzalo.com --cid $CID

echo "Deployment completed."
