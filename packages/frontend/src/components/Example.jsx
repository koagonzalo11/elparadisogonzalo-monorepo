import React from 'react';
import { sendBulkListing } from './api';

function Example() {
  const handleSend = async () => {
    const sampleData = [{ name: "example", value: 123 }];
    try {
      const res = await sendBulkListing(sampleData);
      alert(res.message);
    } catch {
      alert("Failed to send data");
    }
  };

  return <button onClick={handleSend}>Send Bulk Listing</button>;
}

export default Example;
