import { Container, Grid, Typography } from "@mui/material";
import type { Customer } from "../../../../graphql/generate/schema";
import CustomerForm from "../form/CustomerForm";

export default function CustomerCreate() {
  const customer = {} as Customer;

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
            Customer Create
          </Typography>
        </Grid>

        <Grid size={{ xs: 2 }} />

        <Grid size={{ xs: 12 }}>
          <CustomerForm customer={customer} />
        </Grid>
      </Grid>
    </Container>
  );
}
