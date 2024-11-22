import { z } from "zod";

export const categorySchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    subcategories: z.array(z.string()),
    filters: z.array(z.string()),
});