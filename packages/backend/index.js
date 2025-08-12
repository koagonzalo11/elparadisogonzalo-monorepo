require('dotenv').config();

const openaiApiKey = process.env.OPENAI_API_KEY;
console.log('OpenAI API Key loaded:', openaiApiKey ? 'Yes' : 'No');

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "elparadisogonzalo-project"
});

const db = admin.firestore();

db.collection("users").add({
  name: "Koa Gonzalo",
  created: new Date()
}).then(() => {
  console.log("Document added");
  process.exit(0);
}).catch((error) => {
  console.error("Error adding document:", error);
  process.exit(1);
});

