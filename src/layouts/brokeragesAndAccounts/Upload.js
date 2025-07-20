import React, { useState } from "react";
import Papa from "papaparse";

export default function CsvUploader() {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,   // Parses the first row as keys
      skipEmptyLines: true,
      complete: (results) => {
        console.log("Parsed Results:", results.data);
        setData(results.data);
      },
      error: (err) => {
        console.error("Parsing error:", err);
      }
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload CSV Spreadsheet</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {data.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Parsed Data</h3>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key, idx) => (
                  <th key={idx}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.keys(row).map((key, colIndex) => (
                    <td key={colIndex}>{row[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
