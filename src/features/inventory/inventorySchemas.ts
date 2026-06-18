import { z } from "zod";

const inventorySchema = z.object({
    id: z.number().optional(),
    product: z.string(),
    quantity: z.number(),
    price: z.number()
});

export default inventorySchema;