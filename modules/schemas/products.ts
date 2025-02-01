import { z } from "zod";
import CONSTANTS from '@/modules/constants/products';

const productSchema = z.object({
    [CONSTANTS.KEYS.ID]: z.number().optional(),
    [CONSTANTS.KEYS.NAME]: z.string(),
    [CONSTANTS.KEYS.DESCRIPTION]: z.string(),
    [CONSTANTS.KEYS.PRICE]: z.number(),
    [CONSTANTS.KEYS.CATEGORIES]: z.string(),
    [CONSTANTS.KEYS.ACTIVE]: z.boolean().default(true),
    [CONSTANTS.KEYS.FEATURED_PRODUCT]: z.boolean(),
    [CONSTANTS.KEYS.MAIN_IMAGE]: z.instanceof(File),
    [CONSTANTS.KEYS.RELATED_IMAGES]: z.array(z.instanceof(File)),
    [CONSTANTS.KEYS.FILTER_COMBINATIONS]: z.string()
});

export default productSchema