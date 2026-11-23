import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Container, Grid, Snackbar } from "@mui/material";
import { useMutation } from "@apollo/client/react";
import {
  orderFormInput,
  type OrderFormInput,
} from "../../../lib/schema/orderSchema";
import { TextInput } from "../../../components/shared/TextInput";
import { CustomButton } from "../../../components/shared/CustomButton";
import DateInput from "../../../components/shared/DateInput";
import { CheckBoxInput } from "../../../components/shared/CheckBoxInput";
import SelectInput from "../../../components/shared/SelectInput";
import type { OrderStatus, Order } from "../../../../graphql/generate/schema";
import { AddOrderDocument } from "../../../../graphql/generate/operations";
import { PageLoader } from "../../PageLoader";

const ORDER_STATUS_ITEMS: { text: string; value: OrderStatus }[] = [
  { text: "DRAFT", value: "DRAFT" },
  { text: "PENDING", value: "PENDING" },
  { text: "SHIPPED", value: "SHIPPED" },
  { text: "COMPLETED", value: "COMPLETED" },
];

const emptyOrderValues: OrderFormInput = {
  description: "",
  depositAmount: 0,
  otherNotes: "",
  totalAmount: 0,
  orderDate: new Date(),
  status: "DRAFT",
  isDelivery: false,
};

interface OrderFormProps {
  order: Order;
}

export default function OrderForm({ order }: OrderFormProps) {
  const { handleSubmit, control, reset } = useForm<OrderFormInput>({
    mode: "onTouched",
    resolver: zodResolver(orderFormInput),
    defaultValues: {
      description: order?.description || "",
      depositAmount: Number(order?.depositAmount) || 0,
      otherNotes: order?.otherNotes || "",
      totalAmount: Number(order?.totalAmount) || 0,
      orderDate: order?.orderDate
        ? new Date(order.orderDate as string)
        : new Date(),
      status: order?.status || "DRAFT",
      isDelivery: order?.isDelivery ?? false,
    },
  });

  const [successOpen, setSuccessOpen] = useState<boolean>(false);
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  const [addOrder, { loading: addOrderLoading }] =
    useMutation(AddOrderDocument);

  const onSubmit = async (orderInput: OrderFormInput) => {
    setSuccessOpen(false);
    setErrorOpen(false);

    try {
      const customerId = order.customer?.id || order.customerId;
      const outputOrder = orderFormInput.parse(orderInput);

      const response = await addOrder({
        variables: {
          order: {
            ...outputOrder,
            customerId,
            ...(order?.id ? { id: order.id } : {}),
          },
        },
      });

      const savedOrder = response.data?.addOrUpdateOrder as Order | undefined;

      if (savedOrder?.id) {
        if (!order?.id) {
          reset({
            ...emptyOrderValues,
            orderDate: new Date(),
          });
        } else {
          reset({
            description: savedOrder.description ?? orderInput.description,
            depositAmount:
              Number(savedOrder.depositAmount) ||
              Number(orderInput.depositAmount) ||
              0,
            otherNotes: savedOrder.otherNotes ?? orderInput.otherNotes ?? "",
            totalAmount:
              Number(savedOrder.totalAmount) ||
              Number(orderInput.totalAmount) ||
              0,
            orderDate: savedOrder.orderDate
              ? new Date(savedOrder.orderDate as string)
              : new Date(orderInput.orderDate as Date),
            status: savedOrder.status ?? orderInput.status,
            isDelivery: savedOrder.isDelivery ?? orderInput.isDelivery ?? false,
          });
        }

        setSuccessOpen(true);
      } else {
        setErrorOpen(true);
      }
    } catch (error) {
      if (error instanceof Error) console.error(error);
      setErrorOpen(true);
    }
  };

  if (addOrderLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={(_, reason) => {
          if (reason === "clickaway") return;
          setErrorOpen(false);
        }}
      >
        <Alert
          onClose={() => setErrorOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Error saving order data
        </Alert>
      </Snackbar>

      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={(_, reason) => {
          if (reason === "clickaway") return;
          setSuccessOpen(false);
        }}
      >
        <Alert
          onClose={() => setSuccessOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {!order?.id
            ? "Order details successfully added"
            : "Order details successfully updated"}
        </Alert>
      </Snackbar>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DateInput
                name="orderDate"
                control={control}
                label="Order Date"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextInput
                name="description"
                control={control}
                label="Description"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextInput
                name="depositAmount"
                control={control}
                label="Deposit Amount"
                type="number"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextInput
                name="totalAmount"
                control={control}
                label="Total Amount"
                type="number"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextInput
                name="otherNotes"
                control={control}
                label="Other Notes (Optional)"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <SelectInput
                items={ORDER_STATUS_ITEMS}
                name="status"
                control={control}
                label="Status"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <CheckBoxInput
                control={control}
                name="isDelivery"
                label={"Delivery Include"}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <CustomButton type="submit">
                {!order?.id ? "Add New Order" : "Update Order"}
              </CustomButton>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
