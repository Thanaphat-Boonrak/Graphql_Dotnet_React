import { useState } from "react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { DataTable } from "../../../components/shared/DataTable";
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
import {
  AddShoppingCartRounded,
  DeleteOutlineRounded,
  LaunchRounded,
} from "@mui/icons-material";
import type { Customer, Address } from "../../../../graphql/generate/schema";
import { useMutation } from "@apollo/client/react";
import {
  DeleteCustomerByIdDocument,
  GetCustomersDocument,
} from "../../../../graphql/generate/operations";

interface CustomerListProps {
  customers: Customer[];
}

export const CustomerList = ({ customers }: CustomerListProps) => {
  const navigate = useNavigate();
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(
    null,
  );

  const [deleteCustomer, { loading: deleting }] = useMutation(
    DeleteCustomerByIdDocument,
  );

  const handleOpenDeleteDialog = (customer?: Customer) => {
    if (!customer?.id) return;
    setCustomerToDelete(customer);
  };

  const handleClose = () => {
    if (deleting) return;
    setCustomerToDelete(null);
  };

  const deleteCustomerDetails = async () => {
    if (!customerToDelete?.id) return;

    try {
      await deleteCustomer({
        variables: { id: customerToDelete.id },
        refetchQueries: [GetCustomersDocument],
      });
      setCustomerToDelete(null);
    } catch (error) {
      console.error("Failed to delete customer:", error);
    }
  };

  const [columnDefs] = useState<ColDef[]>([
    {
      field: "id",
      headerName: "ID",
      width: 70,
      pinned: "left",
      valueFormatter: (params) => (params.value == null ? "" : params.value),
      cellStyle: { fontWeight: "bold", color: "#64748b" },
      cellRenderer: (param: ICellRendererParams) => {
        return (
          <IconButton
            size="small"
            color="primary"
            onClick={() => navigate(`/customers/${param.value}`)}
          >
            <LaunchRounded fontSize="small" />
          </IconButton>
        );
      },
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellStyle: { fontWeight: "500", color: "#1e293b" },
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      cellStyle: { fontWeight: "500", color: "#1e293b" },
    },
    {
      field: "contactNumber",
      headerName: "Contact",
      flex: 1,
      cellStyle: { color: "#475569" },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.2,
      cellStyle: { color: "#2563eb", fontWeight: "500" },
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1.8,
      valueFormatter: (params) => {
        const address = params.value as Address;
        if (!address) return "";
        const addr = address;
        const line2 = addr.addressLine2 ? `${addr.addressLine2}, ` : "";
        return `${addr.addressLine1}, ${line2}${addr.city}, ${addr.state}, ${addr.country}`;
      },
      cellStyle: { color: "#475569" },
    },
    {
      width: 70,
      pinned: "right",
      sortable: false,
      filter: false,
      cellRenderer: (params: ICellRendererParams<Customer>) => (
        <IconButton
          size="small"
          color="primary"
          onClick={() => navigate(`/customers/${params.data?.id}/new/order`)}
        >
          <AddShoppingCartRounded fontSize="small" />
        </IconButton>
      ),
    },
    {
      width: 70,
      pinned: "right",
      sortable: false,
      filter: false,
      cellRenderer: (params: ICellRendererParams<Customer>) => (
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
      <DataTable rowData={customers} columnDefs={columnDefs} />

      <Dialog
        open={!!customerToDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Customer Details?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to remove this customer and all related orders.
            Confirm to continue or cancel
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={deleting}>
            Cancel
          </Button>
          <Button
            onClick={deleteCustomerDetails}
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
