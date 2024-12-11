import { z } from "zod";

export const orderSchema = z.object({
  suffix: z
    .string()
    .min(2, "Слишком короткий суффикс")
    .max(8, "Мы не можем создавать суффикс больше 8 символом")
    ,
  userAddress: z.string().min(1),
});

export type OrderFormData = z.infer<typeof orderSchema>;
