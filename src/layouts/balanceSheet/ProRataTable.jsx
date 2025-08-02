ProRataTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        align: PropTypes.string,
      })
    ).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
import PropTypes from "prop-types";
ProRataTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        align: PropTypes.string,
      })
    ).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

function parseMoney(str) {
  // Parses strings like "$1,234" to 1234 (number)
  if (typeof str !== "string") return 0;
  const num = Number(str.replace(/[^\d.-]+/g, ""));
  return isNaN(num) ? 0 : num;
}

function ProRataTable({ loading, data }) {
  // Format Ownership Share values: replace M/K, round to integer, add units
  function formatOwnershipShare(value) {
    if (typeof value !== "string") return value;
    // Match patterns like '1 in 91.40M' or '1 in 30.90K'
    const match = value.match(/(\d+) in ([\d,.]+)([MK])/i);
    if (match) {
      const prefix = match[1];
      let num = parseFloat(match[2].replace(/,/g, ""));
      const unit = match[3].toUpperCase();
      if (unit === "M") num = Math.round(num);
      if (unit === "K") num = Math.round(num);
      let unitText = unit === "M" ? " million" : unit === "K" ? " thousand" : "";
      return `~ ${prefix} in ${num.toLocaleString()}${unitText}`;
    }
    return value;
  }
  if (loading) return <p>Loading...</p>;
  if (!data || !data.columns || !data.rows) return <p>No financial data available.</p>;

  // Define the preferred column order
  const preferredOrder = [
    "Company",
    "Ownership Share",
    "Assets",
    "Cash & Equivalents",
    "Liabilities",
    "Equity",
  ];

  // Sort columns according to preferred order, then any others
  const orderedColumns = [
    ...preferredOrder.map((name) => data.columns.find((col) => col.name === name)).filter(Boolean),
    ...data.columns.filter((col) => !preferredOrder.includes(col.name)),
  ];

  const moneyColumnNames = orderedColumns
    .filter(
      (col) =>
        col.name !== "Company" &&
        col.name !== "Ownership Share" &&
        data.rows.some((row) => typeof row[col.name] === "string" && row[col.name].startsWith("$"))
    )
    .map((col) => col.name);

  const columnDefs = orderedColumns.map((col) => ({
    headerName: col.name,
    field: col.name,
    sortable: col.name !== "Company" && col.name !== "Ownership Share", // lock first two columns
    filter: true,
    resizable: true,
    flex: 1, // Auto-size columns to fit grid width
    lockPosition: col.name === "Company" || col.name === "Ownership Share", // lock first two columns
    suppressMovable: col.name === "Company" || col.name === "Ownership Share", // prevent moving
    cellStyle: (params) => {
      if (params.node.rowPinned) {
        return {
          background: "#fff9c4",
          fontWeight: "bold",
          textAlign: moneyColumnNames.includes(col.name) ? "right" : undefined,
        };
      }
      if (moneyColumnNames.includes(col.name)) {
        return { textAlign: "right" };
      }
      return null;
    },
  }));

  // Calculate totals for all numeric columns except Company and Ownership Share
  const totalRow = {};
  data.columns.forEach((col) => {
    if (col.name === "Company" || col.name === "Ownership Share") {
      totalRow[col.name] = col.name === "Company" ? "Total" : "";
    } else {
      totalRow[col.name] = data.rows.reduce((sum, row) => sum + parseMoney(row[col.name]), 0);
      // Format as money if at least one row is formatted as money
      const hasMoney = data.rows.some(
        (row) => typeof row[col.name] === "string" && row[col.name].startsWith("$")
      );
      if (hasMoney) {
        totalRow[col.name] =
          "$" + totalRow[col.name].toLocaleString("en-US", { maximumFractionDigits: 0 });
      }
    }
  });

  // Map rows to format Ownership Share
  const rowData = data.rows.map((row) => {
    if (row["Ownership Share"]) {
      return {
        ...row,
        ["Ownership Share"]: formatOwnershipShare(row["Ownership Share"]),
      };
    }
    return row;
  });

  return (
    <div
      className="ag-theme-alpine hide-ag-horizontal-scroll"
      style={{ height: 400, width: "100%" }}
    >
      <style>{`
        .hide-ag-horizontal-scroll .ag-body-viewport,
        .hide-ag-horizontal-scroll .ag-center-cols-viewport {
          overflow-x: hidden !important;
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        .hide-ag-horizontal-scroll .ag-body-viewport::-webkit-scrollbar,
        .hide-ag-horizontal-scroll .ag-center-cols-viewport::-webkit-scrollbar {
          display: none !important;
        }
      `}</style>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={false}
        pinnedBottomRowData={[totalRow]}
      />
    </div>
  );
}

export default ProRataTable;
