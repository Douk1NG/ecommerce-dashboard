import { z } from "zod";

const categorySchema = z.object({
    id: z.number().optional(),
    name : z.string().min(1),
    description: z.string().optional(),
    featured_category: z.boolean().optional(),
    parent_id: z.string().optional(),
    filters: z.array(z.string()).optional(),
    image: z.instanceof(File).or(z.null()).optional(),
});

export default categorySchema;