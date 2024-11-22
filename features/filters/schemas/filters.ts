import { z } from "zod";

export const filterSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    filters: z.array(z.string())
});