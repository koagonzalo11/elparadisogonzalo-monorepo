const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  request: {
    headers: {
      'X-GitHub-Api-Version': '2025-01-01' // ✅ set to desired version
    }
  }
});
