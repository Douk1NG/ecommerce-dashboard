import { z } from "zod";

const productSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    categories: z.array(z.number()),
    images: z.any(),
    // images: z.array(z.instanceof(File)),
    active: z.boolean().default(true)
    // featured_product: z.boolean()
});

export default productSchema