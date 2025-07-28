import React from "react";
import PropTypes from "prop-types";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

function ProRataTable({ loading, data }) {
  if (loading) return <p>Loading...</p>;
  if (!data || !data.columns || !data.rows) return <p>No financial data available.</p>;

  const columnDefs = data.columns.map((col) => ({
    headerName: col.name,
    field: col.name,
    sortable: true,
    filter: true,
    resizable: true,
  }));
  const rowData = data.rows;

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
}

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

export default ProRataTable;
