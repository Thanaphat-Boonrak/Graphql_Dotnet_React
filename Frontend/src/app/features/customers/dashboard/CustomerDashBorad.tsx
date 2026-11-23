import { useQuery } from "@apollo/client/react";

import { CustomerList } from "./CustomerList";
import { Grid, Typography } from "@mui/material";
import { PageLoader } from "../../PageLoader";
import { PageError } from "../../PageError";
import { GetCustomersDocument } from "../../../../graphql/generate/operations";
import type { Customer } from "../../../../graphql/generate/schema";

export const CustomerDashBorad = () => {
  const {
    data: customersData,
    loading,
    error,
  } = useQuery(GetCustomersDocument, {
    fetchPolicy: "no-cache",
  });
  if (loading) {
    return <PageLoader />;
  }

  if (!customersData || error) {
    return <PageError />;
  }
  const customers = customersData.customers as Customer[];

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid size={{ xs: 12 }}>
        <Typography
          component="div"
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#1e293b",
            display: "block",
            textAlign: "center",
            mb: 2,
          }}
        >
          Customer List
        </Typography>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <CustomerList customers={customers} />
      </Grid>
    </Grid>
  );
};
