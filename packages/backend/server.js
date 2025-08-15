const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/api/bulk-listing', (req, res) => {
  const data = req.body;
  console.log('Received bulk listing data:', data);

  // TODO: add your data processing/storage logic here

  res.json({ message: 'Bulk listing data received successfully.' });
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});

