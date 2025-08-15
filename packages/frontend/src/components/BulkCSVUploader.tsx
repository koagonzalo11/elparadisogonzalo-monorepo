import React, { useState } from 'react'
import Papa from 'papaparse'

interface CsvRow {
  [key: string]: string
}

const BulkCSVUploader: React.FC = () => {
  const [data, setData] = useState<CsvRow[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const file = e.target.files?.[0]
    if (!file) return

    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length) {
          setError('Error parsing CSV file')
          console.error(results.errors)
        } else {
          setData(results.data)
          sendDataToBackend(results.data)
        }
      }
    })
  }

  const sendDataToBackend = async (csvData: CsvRow[]) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/bulk-listing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(csvData)
      })
      const result = await response.json()
      alert(result.message)
    } catch (err) {
      alert('Failed to send data to backend.')
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="p-2 border border-gray-700 rounded bg-gray-800 cursor-pointer"
      />
      {error && <p className="text-red-500">{error}</p>}
      {data.length > 0 && <p>{data.length} rows loaded</p>}
    </div>
  )
}

export default BulkCSVUploader
