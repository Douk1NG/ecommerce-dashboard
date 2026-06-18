import { z } from "zod";

const filterSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1),
    filters: z.array(z.string()).min(1)
});

export default filterSchema;