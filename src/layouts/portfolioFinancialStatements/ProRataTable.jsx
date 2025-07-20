import React from "react";

function ProRataTable({ loading, data }) {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || !data.columns || !data.rows) {
    return <p>No financial data available.</p>;
  }

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
        </tbody>
      </table>
    </div>
  );
}

export default ProRataTable;

import PropTypes from "prop-types";

ProRataTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        align: PropTypes.oneOf(["left", "right"]).isRequired,
      })
    ).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
};