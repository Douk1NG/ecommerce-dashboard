import { z } from "zod";
import inventorySchema from "@/modules/schemas/inventory";

export type Inventory = z.infer<typeof inventorySchema>;

export type TableProps = {
    dataSource: Inventory[];
};