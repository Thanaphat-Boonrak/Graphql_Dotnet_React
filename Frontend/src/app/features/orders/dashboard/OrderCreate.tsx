import { Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router";
import type { Order } from "../../../../graphql/generate/schema";
import OrderForm from "../form/OrderForm";

export default function OrderCreate() {
  const { customerId } = useParams();
  const order = { customerId: parseInt(customerId || "0") } as Order;

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              mb: 2,
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            Order Create
          </Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <OrderForm order={order} />
        </Grid>
      </Grid>
    </Container>
  );
}
