const { create } = require('ipfs-http-client');
const fs = require('fs');
const path = require('path');

const projectId = process.env.INFURA_PROJECT_ID;
const projectSecret = process.env.INFURA_PROJECT_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

(async () => {
  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: { authorization: auth },
  });

  const distPath = path.join(__dirname, '../packages/frontend/dist');
  const files = fs.readdirSync(distPath).map(file => ({
    path: file,
    content: fs.readFileSync(path.join(distPath, file))
  }));

  const result = await client.addAll(files, { wrapWithDirectory: true });
  for await (const file of result) {
    if (!file.path) {
      console.log(`✅ Deployed to IPFS: https://ipfs.io/ipfs/${file.cid}`);
    }
  }
})();
