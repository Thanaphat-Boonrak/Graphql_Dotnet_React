import { z } from "zod";

export const orderFormInput = z.object({
  orderDate: z.coerce
    .date()
    .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
      message: "Order date is required",
    }),

  description: z.string().min(1, "Description is required"),

  depositAmount: z.coerce.number().min(0, "Deposit amount is required"),

  otherNotes: z.string().optional(),

  totalAmount: z.coerce.number().min(0, "TotalAmount is required"),
  isDelivery: z.boolean().default(false),
  status: z
    .enum(["COMPLETED", "DRAFT", "PENDING", "SHIPPED"])
    .default("PENDING"),
});

export type OrderFormInput = z.input<typeof orderFormInput>;
