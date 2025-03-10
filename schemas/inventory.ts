import { z } from "zod";
import CONSTANTS from '@/constants/inventory';

const inventorySchema = z.object({
    [CONSTANTS.KEYS.ID]: z.number().optional(),
    [CONSTANTS.KEYS.PRODUCT]: z.string(),
    [CONSTANTS.KEYS.QUANTITY]: z.number(),
    [CONSTANTS.KEYS.PRICE]: z.number()
});

export default inventorySchema