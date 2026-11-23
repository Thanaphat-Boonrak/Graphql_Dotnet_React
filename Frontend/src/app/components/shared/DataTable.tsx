import { useMemo } from "react";
import { Box, Paper } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { type ColDef, type RowSelectionOptions } from "ag-grid-community";

interface DataTableProps<T> {
  rowData: T[];
  columnDefs: ColDef<T>[];
  height?: number | string;
}

export const DataTable = <T,>({
  rowData,
  columnDefs,
  height = 520,
}: DataTableProps<T>) => {
  const defaultColDef = useMemo<ColDef<T>>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    [],
  );

  const rowSelection = useMemo<RowSelectionOptions>(
    () => ({
      mode: "singleRow",
    }),
    [],
  );

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #e2e8f0",
        boxShadow:
          "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
      }}
    >
      <Box className="ag-theme-quartz" style={{ height, width: "100%" }}>
        <AgGridReact<T>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={rowSelection}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50, 100]}
        />
      </Box>
    </Paper>
  );
};
