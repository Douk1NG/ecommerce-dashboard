import { z } from "zod";

const filterSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    filters: z.array(z.string())
});

export default filterSchema