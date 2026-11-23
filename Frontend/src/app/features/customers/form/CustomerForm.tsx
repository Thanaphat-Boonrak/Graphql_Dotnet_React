import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Container, Grid, Snackbar } from "@mui/material";
import { useMutation } from "@apollo/client/react";
import {
  customerFormInput,
  type CustomerFormInput,
} from "../../../lib/schema/customerSchema";
import { TextInput } from "../../../components/shared/TextInput";
import { CustomButton } from "../../../components/shared/CustomButton";
import SelectInput from "../../../components/shared/SelectInput";
import { COUNTRY_ITEMS } from "../../../lib/utils/Countries";
import type { Customer } from "../../../../graphql/generate/schema";
import {
  AddOrUpdateCustomerDocument,

} from "../../../../graphql/generate/operations";
import { PageLoader } from "../../PageLoader";

interface CustomerFormProps {
  customer: Customer;
}

export default function CustomerForm({ customer }: CustomerFormProps) {
  const { handleSubmit, control, reset } = useForm<CustomerFormInput>({
    mode: "onTouched",
    resolver: zodResolver(customerFormInput),
    defaultValues: {
      firstName: customer?.firstName || "",
      lastName: customer?.lastName || "",
      contactNumber: customer?.contactNumber || "",
      email: customer?.email || "",
      addressLine1: customer?.address?.addressLine1 || "",
      addressLine2: customer?.address?.addressLine2 || "",
      city: customer?.address?.city || "",
      state: customer?.address?.state || "",
      country: customer?.address?.country || "",
    },
  });

  const [successOpen, setSuccessOpen] = useState<boolean>(false);
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  const [addOrUpdateCustomer, { loading: addOrUpdateCustomerLoading }] =
    useMutation(AddOrUpdateCustomerDocument);

  const onSubmit = async (customerInput: CustomerFormInput) => {
    setSuccessOpen(false);
    setErrorOpen(false);

    try {
      const response = await addOrUpdateCustomer({
        variables: {
          customer: {
            ...customerInput,
            ...(customer?.id ? { id: customer.id } : {}),
          },
        },
      });

      const savedCustomer = response.data?.addOrUpdateCustomer as Customer;

      if (savedCustomer?.id) {
        reset({
          firstName: "",
          lastName: "",
          contactNumber: "",
          email: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          country: "",
        });
        setSuccessOpen(true);
      } else {
        reset({
          firstName: savedCustomer.firstName ?? customerInput.firstName,
          lastName: savedCustomer.lastName ?? customerInput.lastName,
          contactNumber:
            savedCustomer.contactNumber ?? customerInput.contactNumber,
          email: savedCustomer.email ?? customerInput.email,
          addressLine1:
            savedCustomer.address?.addressLine1 ?? customerInput.addressLine1,
          addressLine2:
            savedCustomer.address?.addressLine2 ??
            customerInput.addressLine2 ??
            "",
          city: savedCustomer.address?.city ?? customerInput.city,
          state: savedCustomer.address?.state ?? customerInput.state,
          country: savedCustomer.address?.country ?? customerInput.country,
        });

        setErrorOpen(true);
      }
    } catch (error) {
      if (error instanceof Error) console.error(error);
      setErrorOpen(true);
    }
  };

  if (addOrUpdateCustomerLoading) {
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
          Error saving customer data
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
          {!customer?.id
            ? "Customer details successfully added"
            : "Customer details successfully updated"}
        </Alert>
      </Snackbar>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextInput
                name="firstName"
                control={control}
                label="First Name"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextInput name="lastName" control={control} label="Last Name" />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextInput
                name="contactNumber"
                control={control}
                label="Contact Number"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextInput name="email" control={control} label="Email" />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextInput
                name="addressLine1"
                control={control}
                label="Address Line 1"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextInput
                name="addressLine2"
                control={control}
                label="Address Line 2 (Optional)"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextInput name="city" control={control} label="City" />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextInput name="state" control={control} label="State" />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <SelectInput
                name="country"
                items={COUNTRY_ITEMS}
                control={control}
                label="Country"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <CustomButton type="submit">
                {!customer?.id ? "Add New Customer" : "Update Customer"}
              </CustomButton>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
