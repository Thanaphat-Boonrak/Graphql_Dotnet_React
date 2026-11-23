import { z } from 'zod';

export const customerFormInput = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  addressLine1: z.string().min(1, "Address line is required"),
  addressLine2: z.string().optional(),
   city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
});

export type CustomerFormInput = z.infer<typeof customerFormInput>;