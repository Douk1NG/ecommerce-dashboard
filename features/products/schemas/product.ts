import { z } from "zod";

export const productSchema = z.object({
    id: z.number().optional(),
    title: z.string(),
    description: z.string(),
    price: z.number().positive(),
    categories: z.array(z.record(z.string(), z.number())),
    image: z.string().url(),
    active: z.boolean().default(true)
});