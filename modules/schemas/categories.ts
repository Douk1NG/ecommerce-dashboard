import { z } from "zod";
import CONSTANTS from '@/modules/constants/categories';

const categorySchema = z.object({
    [CONSTANTS.KEYS.ID]: z.number().optional(),
    [CONSTANTS.KEYS.NAME] : z.string(),
    [CONSTANTS.KEYS.SUBCATEGORIES]: z.array(z.string()),
    [CONSTANTS.KEYS.FILTERS]: z.array(z.string()),
});

export default categorySchema