import React, { useState } from 'react';
import Papa from 'papaparse';

export default function BulkCSVUploader() {
  const [data, setData] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data);
        sendDataToBackend(results.data);
      },
      error: (error) => {
        alert('CSV parsing error: ' + error.message);
      },
    });
  };

  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch('/api/bulk-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      alert(result.message);
    } catch (err) {
      alert('Failed to send data to backend.');
    }
  };

  return (
    <div>
      <h2>Upload CSV file</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

