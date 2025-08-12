// full-deploy-free.js
const { execSync } = require("child_process");

console.log("🚀 Building frontend...");
execSync("npm run build", { stdio: "inherit" });

console.log("📦 Adding to IPFS...");
const cid = execSync("ipfs add -r dist --quiet | tail -n 1").toString().trim();
console.log(`✅ Added to IPFS with CID: ${cid}`);

console.log("\n�� Manual DNSLink Setup:");
console.log(`1. Go to your Unstoppable Domains dashboard.`);
console.log(`2. Edit DNS Records for your domain.`);
console.log(`3. Add a TXT record with: dnslink=/ipfs/${cid}`);
console.log(`4. Save and wait for DNS to propagate.`);

console.log(`\n✨ Your site will be live at: https://gateway.ipfs.io/ipfs/${cid}`);
