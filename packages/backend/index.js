const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "elparadisogonzalo-project"
});

const db = admin.firestore();

db.collection("users").add({
  name: "Koa  Gonzalo",
  created: new Date()
}).then(() => {
  console.log("Document added");
  process.exit(0);
});
