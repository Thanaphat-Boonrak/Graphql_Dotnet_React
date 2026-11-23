import { Grid, Typography } from "@mui/material";
import { OrderList } from "./OrderList";

import { useQuery } from "@apollo/client/react";
import { PageLoader } from "../../PageLoader";
import { PageError } from "../../PageError";
import type { Order } from "../../../../graphql/generate/schema";
import { GetOrdersDocument } from "../../../../graphql/generate/operations";

export const OrderDashBoard = () => {
  const {
    data: ordersData,
    loading,
    error,
  } = useQuery(GetOrdersDocument, {
    fetchPolicy: "cache-and-network",
  });
  if (loading) {
    return <PageLoader />;
  }

  if (!ordersData || error) {
    return <PageError />;
  }

  const orders = ordersData.orders as Order[];

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
          Orders List
        </Typography>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <OrderList orders={orders} />
      </Grid>
    </Grid>
  );
};
