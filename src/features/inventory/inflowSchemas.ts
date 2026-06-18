import { z } from "zod";

const inflowSchema = z.object({
    id: z.number().optional(),
    quantity: z.number().min(1),
    unit_price: z.number().min(1),
    total_price: z.number().min(1),
    reason: z.string().min(1),
    date: z.string().min(1),
    combinations: z.array(z.object({
        combination_id: z.number().optional(),
        quantity: z.number().min(1),
        unit_price: z.number().min(1),
        total_price: z.number().min(1),
    }))
});

export default inflowSchema;