import React from 'react';
import { sendBulkListing } from '../api';  // adjust path if needed

export default function Reborn() {
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
