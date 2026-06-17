import { z } from "zod";
import inventorySchema from "@/src/features/inventory/inventorySchemas";

export type Inventory = z.infer<typeof inventorySchema>;

export type TableProps = {
    dataSource: Inventory[];
};