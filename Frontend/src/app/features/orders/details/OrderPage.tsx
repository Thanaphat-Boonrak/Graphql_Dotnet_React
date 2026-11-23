import { useParams } from "react-router";
import { useQuery } from "@apollo/client/react";
import { PageLoader } from "../../PageLoader";
import { PageError } from "../../PageError";
import { Container, Grid, Typography } from "@mui/material";
import OrderForm from "../form/OrderForm"; // 👈 เปลี่ยนมาใช้ OrderForm
import { GetOrderByIdDocument } from "../../../../graphql/generate/operations";
import type { Order } from "../../../../graphql/generate/schema";


export default function OrderPage() {
  const { id } = useParams();
  const orderId = id ? parseInt(id) : 0;

  const {
    data: orderData,
    loading,
    error,
  } = useQuery(GetOrderByIdDocument, {
    variables: { id: orderId },
    skip: !orderId,
  });

  if (loading) {
    return <PageLoader />;
  }

  if (
    error ||
    !orderData ||
    !orderData.orders ||
    orderData.orders.length === 0
  ) {
    return <PageError message={`Failed to retrieve order id ${id}`} />;
  }

  const order = orderData.orders[0] as Order;

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
            Order Details
          </Typography>
        </Grid>

        <Grid size={{ xs: 2 }} />

        <Grid size={{ xs: 12 }}>
          <OrderForm order={order} />
        </Grid>
      </Grid>
    </Container>
  );
}
