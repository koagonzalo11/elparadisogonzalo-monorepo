import React, { useState } from 'react';
import Papa from 'papaparse';

export default function BulkCSVUploader() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    setError(null);
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length) {
          setError('Error parsing CSV file');
          console.error(results.errors);
        } else {
          setData(results.data);
          sendDataToBackend(results.data);
        }
      },
    });
  };

  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/api/bulk-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      alert(result.message);
    } catch (err) {
      alert('Failed to send data to backend.');
      console.error(err);
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data.length > 0 && <p>{data.length} rows loaded</p>}
    </div>
  );
}

