import React from "react";
import PropTypes from "prop-types";
import { Card, Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from "@mui/material";
import ArgonTypography from "components/ArgonTypography";

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
    return <div className="text-center my-3">Loading...</div>;
  }
  if (!data || !data.columns || !data.rows) {
    return <div className="text-center my-3">No financial data available.</div>;
  }
  const totals = getTotals(data.rows, data.columns);
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            {data.columns.map((col, idx) => (
              <th key={idx} className={col.align === "right" ? "text-end" : "text-start"}>
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rIdx) => (
            <tr key={rIdx}>
              {data.columns.map((col, cIdx) => (
                <td key={cIdx} className={col.align === "right" ? "text-end" : "text-start"}>
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
    ),
    rows: PropTypes.arrayOf(PropTypes.object)
  })
};

export default ProRataTable;