import Papa from "papaparse";

export function parseBrokerageCsv(file, callback) {
  Papa.parse(file, {
    skipEmptyLines: false,
    complete: (results) => {
      const data = results.data;

      let firstTable = [];
      let secondTable = [];
      let currentTable = 1;
      let secondTableHeaders = [];
      let secondTableData = [];

      for (let i = 0; i < data.length; i++) {
        const row = data[i];

        // Check if row is entirely empty (delimiter between tables)
        const isEmptyRow = row.every(cell => cell.trim() === "");

        if (isEmptyRow) {
          currentTable = 2;
          continue;
        }

        if (currentTable === 1) {
          firstTable.push(row);
        } else {
          if (secondTableHeaders.length === 0) {
            secondTableHeaders = row;
          } else {
            secondTableData.push(row);
          }
        }
      }

        // Process first table (key-value pairs)
        const firstTableResults = {};
        firstTable.forEach(row => {
        const key = row[0] ? row[0].trim() : "";
        const value = row[1] ? row[1].trim() : "";

        switch (key) {
            case "As of Date":
            firstTableResults["As of Date"] = value;
            break;
            case "Account":
            firstTableResults["Account"] = value;
            break;
            case "Cash":
            firstTableResults["Cash"] = parseFloat(value);
            break;
            case "Investments":
            firstTableResults["Investments"] = parseFloat(value);
            break;
            case "Total Value":
            firstTableResults["Total Value"] = parseFloat(value);
            break;
            case "Margin":
            firstTableResults["Margin"] = value || null;
            break;
            default:
            // Optionally handle unknown keys or skip
            break;
        }
        });

      // Process second table
      const secondTableResults = secondTableData.map(row => {
        const rowObj = {};
        secondTableHeaders.forEach((key, index) => {
          rowObj[key.trim()] = row[index] ? row[index].trim() : "";
        });
        return {
          "Symbol": rowObj["Symbol"],
          "Market": rowObj["Market"],
          "Quantity": rowObj["Quantity"]
        };
      });

      callback({
        firstTable: firstTableResults,
        secondTable: secondTableResults
      });
    },
    error: (err) => {
      console.error("CSV parse error:", err);
      callback(null, err);
    }
  });
}
