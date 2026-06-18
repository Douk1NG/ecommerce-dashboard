import { z } from "zod";

const productSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    categories: z.array(z.string()),
    active: z.boolean().default(true),
    featured_product: z.boolean(),
    main_image: z.string().optional().nullable(),
    related_images: z.array(z.instanceof(File)).optional(),
    filter_combinations: z.array(z.object({
        price: z.number(),
        filters: z.array(z.number())
    })).optional()
});

export default productSchema;