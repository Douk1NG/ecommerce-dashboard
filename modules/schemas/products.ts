import { z } from "zod";
import CONSTANTS from '@/modules/constants/products';

const productSchema = z.object({
    [CONSTANTS.KEYS.ID]: z.number().optional(),
    [CONSTANTS.KEYS.NAME]: z.string(),
    [CONSTANTS.KEYS.DESCRIPTION]: z.string(),
    [CONSTANTS.KEYS.PRICE]: z.number(),
    [CONSTANTS.KEYS.CATEGORIES]: z.array(z.number()),
    [CONSTANTS.KEYS.ACTIVE]: z.boolean().default(true),
    [CONSTANTS.KEYS.FEATURED_PRODUCT]: z.boolean(),
    [CONSTANTS.KEYS.MAIN_IMAGE]: z.instanceof(File).optional(),
    [CONSTANTS.KEYS.RELATED_IMAGES]: z.array(z.instanceof(File)).optional(),
    [CONSTANTS.KEYS.FILTER_COMBINATIONS]: z.array(z.object({
        price: z.number(),
        filters: z.array(z.number())
    }))
});

export default productSchema