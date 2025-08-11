import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const CLIENT_ID = "your-client-id";
const CLIENT_SECRET = "your-client-secret";
const REDIRECT_URI = "http://localhost:3000/callback";

app.get("/", (req, res) => {
  const authorizeUrl = `https://auth.unstoppabledomains.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=openid+email`;
  res.send(`<a href="${authorizeUrl}">Login with Unstoppable Domains</a>`);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code provided");

  try {
    const tokenRes = await fetch("https://auth.unstoppabledomains.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const tokenData = await tokenRes.json();
    if (tokenData.error) return res.status(400).json(tokenData);

    const accessToken = tokenData.access_token;

    const userRes = await fetch("https://auth.unstoppabledomains.com/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" },
    });

    const userData = await userRes.json();

    res.json({ user: userData, access_token: accessToken });
  } catch (err) {
    console.error("OAuth Error:", err);
    res.status(500).send("OAuth Failed");
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

