import { z } from "zod";

export const productSchema = z.object({
    id: z.number().optional(),
    title: z.string(),
    description: z.string(),
    price: z.number(),
    categories: z.array(z.string()),
    image: z.string().url(),
    active: z.boolean().default(true)
});