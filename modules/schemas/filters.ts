import { z } from "zod";
import CONSTANTS from '@/modules/constants/filters';

const filterSchema = z.object({
    [CONSTANTS.KEYS.ID]: z.number().optional().nullable(),
    [CONSTANTS.KEYS.NAME]: z.string().min(1),
    [CONSTANTS.KEYS.FILTERS]: z.array(z.string()).min(1)
});

export default filterSchema