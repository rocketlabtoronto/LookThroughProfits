import React from "react";
import PropTypes from "prop-types";

function getTotals(rows, columns) {
  const totals = {};
  columns.forEach(col => {
    if (col.name === "Company" || col.name === "Ownership Share") return;
    let sum = 0;
    rows.forEach(row => {
      const val = row[col.name];
      if (typeof val === "string" && val.startsWith("$")) {
        const num = parseFloat(val.replace(/[$,]/g, ""));
        if (!isNaN(num)) sum += num;
      }
    });
    totals[col.name] = "$" + sum.toLocaleString("en-US", { maximumFractionDigits: 0 });
  });
  return totals;
}

function ProRataTable({ loading, data }) {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || !data.columns || !data.rows) {
    return <p>No financial data available.</p>;
  }
  const totals = getTotals(data.rows, data.columns);
  return (
    <div style={{ padding: "1rem" }}>
      <table border="1" cellPadding="6" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {data.columns.map((col, idx) => (
              <th key={idx} style={{ textAlign: col.align }}>{col.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rIdx) => (
            <tr key={rIdx}>
              {data.columns.map((col, cIdx) => (
                <td key={cIdx} style={{ textAlign: col.align }}>
                  {row[col.name] || "—"}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td><strong>Total</strong></td>
            <td></td>
            {data.columns.slice(2).map(col => (
              <td key={col.name}><strong>{totals[col.name]}</strong></td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}


ProRataTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        align: PropTypes.string
      })
    ).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired
};

export default ProRataTable;
