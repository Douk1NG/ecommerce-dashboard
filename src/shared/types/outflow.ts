import { z } from "zod";
import outflowSchema from "@/src/features/inventory/outflowSchemas";

export type Outflow = z.infer<typeof outflowSchema>;

export type TableProps = {
    dataSource: Outflow[];
};