import { z } from "zod";
import CONSTANTS from '@/modules/constants/filters';

const filterSchema = z.object({
    [CONSTANTS.KEYS.ID]: z.number().optional(),
    [CONSTANTS.KEYS.NAME]: z.string(),
    [CONSTANTS.KEYS.FILTERS]: z.array(z.record(z.string(), z.string()))
});

export default filterSchema