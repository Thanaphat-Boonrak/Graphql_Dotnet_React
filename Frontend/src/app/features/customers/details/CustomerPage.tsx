import { useNavigate, useParams } from "react-router";
import { useQuery } from "@apollo/client/react";
import { PageLoader } from "../../PageLoader";
import { PageError } from "../../PageError";

import { Button, Container, Grid, Typography } from "@mui/material";
import CustomerForm from "../form/CustomerForm";
import { GetCustomerByIdDocument } from "../../../../graphql/generate/operations";
import type { Customer } from "../../../../graphql/generate/schema";

export default function CustomerPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const customerId = id ? parseInt(id) : 0;
  const {
    data: customerData,
    loading,
    error,
  } = useQuery(GetCustomerByIdDocument, {
    variables: { id: customerId },
    skip: !customerId,
  });

  if (loading) {
    return <PageLoader />;
  }

  if (error || !customerData || !customerData.customers) {
    return <PageError message={`Failed to retrived customer id ${id}`} />;
  }

  const customer = customerData.customers[0] as Customer;
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid size={{ xs: 2 }} />

        <Grid size={{ xs: 8 }}>
          <Typography
            component="div"
            variant="h5"
            sx={{
              display: "block",
              mb: 2,
              textAlign: "center",
            }}
          >
            Customer Details
          </Typography>
        </Grid>

        <Grid size={{ xs: 2 }} />

        <Grid size={{ xs: 12 }}>
          <CustomerForm customer={customer} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Button
            onClick={() => navigate(`/customers/${customer.id}/new/order`)}
            variant="contained"
            fullWidth={true}
          ></Button>
        </Grid>
      </Grid>
    </Container>
  );
}
