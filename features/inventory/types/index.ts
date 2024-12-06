import { z } from "zod";
import inventorySchema from "../schemas";

export type Inventory = z.infer<typeof inventorySchema>;

export type InventoryFormProps = {
    onSuccess?: () => void;
    category?: Inventory;
};

export type InventoryTableProps = {
    dataSource: Inventory[];
}

export type InventoryPageProps = {
    children: React.ReactNode;
}