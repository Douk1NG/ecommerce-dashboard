import { z } from "zod";
import CONSTANTS from '@/constants/filters';

const filterSchema = z.object({
    [CONSTANTS.KEYS.ID]: z.number().optional(),
    [CONSTANTS.KEYS.NAME]: z.string().min(1),
    [CONSTANTS.KEYS.FILTERS]: z.array(z.string()).min(1)
});

export default filterSchema