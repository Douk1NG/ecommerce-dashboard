import { z } from "zod";
import CONSTANTS from '../resources/constants';

const inventorySchema = z.object({
    [CONSTANTS.KEYS.PRODUCT] : z.string(),
    [CONSTANTS.KEYS.QUANTITY]: z.number(),
});

export default inventorySchema