import { useState } from "react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { DataTable } from "../../../components/shared/DataTable";
import { DeleteOutlineRounded, LaunchRounded } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router";
import type { Order } from "../../../../graphql/generate/schema";
import { useMutation } from "@apollo/client/react";
import {
  DeleteOrderByIdDocument,
  GetOrdersDocument,
} from "../../../../graphql/generate/operations";

interface OrderListProps {
  orders: Order[];
}

export const OrderList = ({ orders }: OrderListProps) => {
  const navigate = useNavigate();
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  const [deleteOrder, { loading: deleting }] = useMutation(
    DeleteOrderByIdDocument,
  );

  const handleOpenDeleteDialog = (order?: Order) => {
    if (!order?.id) return;
    setOrderToDelete(order);
  };

  const handleClose = () => {
    if (deleting) return;
    setOrderToDelete(null);
  };

  const deleteOrderDetails = async () => {
    if (!orderToDelete?.id) return;

    try {
      await deleteOrder({
        variables: { id: orderToDelete.id },
        refetchQueries: [GetOrdersDocument],
      });
      setOrderToDelete(null);
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  const [columnDefs] = useState<ColDef[]>([
    {
      field: "id",
      headerName: "ID",
      width: 70,
      pinned: "left",
      cellStyle: { fontWeight: "bold", color: "#64748b" },
      cellRenderer: (param: ICellRendererParams) => {
        return (
          <IconButton
            size="small"
            color="primary"
            onClick={() => navigate(`/orders/${param.value}`)}
          >
            <LaunchRounded fontSize="small" />
          </IconButton>
        );
      },
    },
    {
      field: "customer",
      headerName: "Customer Name",
      flex: 1.5,
      cellRenderer: (params: ICellRendererParams) => {
        const customer = params.value;
        if (!customer) return "-";
        return `${customer.firstName} ${customer.lastName}`;
      },
      cellStyle: { fontWeight: "500", color: "#1e293b" },
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      flex: 1.2,
      cellRenderer: (params: ICellRendererParams) => {
        if (!params.value) return "-";
        return new Date(params.value).toLocaleString("en-EN", {
          dateStyle: "medium",
          timeStyle: "short",
        });
      },
      cellStyle: { color: "#475569" },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1.2,
    },
    {
      width: 70,
      pinned: "right",
      sortable: false,
      filter: false,
      cellRenderer: (params: ICellRendererParams<Order>) => (
        <IconButton
          size="small"
          color="error"
          disabled={deleting || !params.data?.id}
          onClick={() => handleOpenDeleteDialog(params.data)}
        >
          <DeleteOutlineRounded fontSize="small" />
        </IconButton>
      ),
    },
  ]);

  return (
    <>
      <DataTable rowData={orders} columnDefs={columnDefs} />

      <Dialog
        open={Boolean(orderToDelete)}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Order Details?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to remove this order. Confirm to continue or cancel
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={deleting}>
            Cancel
          </Button>
          <Button
            onClick={deleteOrderDetails}
            color="error"
            autoFocus
            disabled={deleting}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
