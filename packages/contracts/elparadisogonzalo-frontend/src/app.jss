import React, { useEffect, useState } from "react";
import { getContract } from "./contract";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchMessage() {
      try {
        const contract = await getContract();
        const msg = await contract.yourReadFunction(); // replace with your actual function name
        setMessage(msg);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMessage();
  }, []);

  return (
    <div>
      <h1>Contract message: {message}</h1>
    </div>
  );
}

export default App;
