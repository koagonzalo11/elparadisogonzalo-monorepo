require('dotenv').config();

const openaiApiKey = process.env.OPENAI_API_KEY;
console.log('OpenAI API Key loaded:', openaiApiKey ? 'Yes' : 'No');

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'elparadisogonzalo-project'
});

const db = admin.firestore();

async function testFirestore() {
  try {
    await db.collection('users').add({
      name: 'Test User',
      created: new Date()
    });
    console.log('Firestore write succeeded');
  } catch (error) {
    console.error('Firestore write failed:', error);
  }
}

testFirestore();
