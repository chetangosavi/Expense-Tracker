import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
  const ActionCellRenderer = (props) => {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(props.data)}
          className="px-2 py-1 bg-blue-500 text-white rounded cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(props.data._id)}
          className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer"
        >
          Delete
        </button>
      </div>
    );
  };
  const columns = [
    {
      headerName: "Title",
      field: "title",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Amount",
      field: "amount",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Category",
      field: "category",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Payment Method",
      field: "paymentMethod",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Currency",
      field: "currency",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Date",
      field: "date",
      flex: 1,
      sortable: true,
      filter: true,
      valueFormatter: (params) => {
        if (!params.value) return "";
        const d = new Date(params.value);
        return isNaN(d) ? "" : d.toLocaleDateString();
      },
    },
    {
      headerName: "Notes",
      field: "notes",
      flex: 2,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Actions",
      field: "actions",
      flex: 1,
      cellRenderer: ActionCellRenderer,
    },
  ];

  return (
    <div className="ag-theme-alpine mb-5">
      <AgGridReact
        rowData={expenses}
        rowHeight={50}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
        overlayNoRowsTemplate='<span class="text-gray-500 text-lg">No Records Available</span>'
      />
    </div>
  );
};

export default ExpenseTable;
