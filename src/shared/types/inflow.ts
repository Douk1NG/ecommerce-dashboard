import { z } from "zod";
import inflowSchema from "@/src/features/inventory/inflowSchemas";

export type Inflow = z.infer<typeof inflowSchema>;

export type TableProps = {
    dataSource: Inflow[];
};