import { z } from "zod";
import CONSTANTS from '../resources/constants';

const filterSchema = z.object({
    [CONSTANTS.KEYS.ID]: z.number().optional(),
    [CONSTANTS.KEYS.NAME]: z.string(),
    [CONSTANTS.KEYS.FILTERS]: z.array(z.string())
});

export default filterSchema