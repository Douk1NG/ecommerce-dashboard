import { z } from "zod";
import CONSTANTS from '@/constants/categories';

const categorySchema = z.object({
    [CONSTANTS.KEYS.ID]: z.number().optional(),
    [CONSTANTS.KEYS.NAME] : z.string().min(1),
    [CONSTANTS.KEYS.DESCRIPTION]: z.string().optional(),
    [CONSTANTS.KEYS.FEATURED_CATEGORY]: z.boolean().optional(),
    [CONSTANTS.KEYS.PARENT_ID]: z.string().optional(),
    [CONSTANTS.KEYS.FILTERS]: z.array(z.string()).optional(),
    [CONSTANTS.KEYS.IMAGE]: z.instanceof(File).or(z.null()).optional(),
});

export default categorySchema