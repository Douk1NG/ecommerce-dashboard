import { z } from "zod";
import CONSTANTS from '@/constants/inflow';

const inflowSchema = z.object({
    [CONSTANTS.KEYS.ID]: z.number().optional(),
    [CONSTANTS.KEYS.QUANTITY]: z.number().min(1),
    [CONSTANTS.KEYS.UNIT_PRICE]: z.number().min(1),
    [CONSTANTS.KEYS.TOTAL_PRICE]: z.number().min(1),
    [CONSTANTS.KEYS.REASON]: z.string().min(1),
    [CONSTANTS.KEYS.DATE]: z.string().min(1),
    [CONSTANTS.KEYS.COMBINATIONS]: z.array(z.object({
        [CONSTANTS.KEYS.COMBINATION_ID]: z.number().optional(),
        [CONSTANTS.KEYS.QUANTITY]: z.number().min(1),
        [CONSTANTS.KEYS.UNIT_PRICE]: z.number().min(1),
        [CONSTANTS.KEYS.TOTAL_PRICE]: z.number().min(1),
    }))
});

export default inflowSchema