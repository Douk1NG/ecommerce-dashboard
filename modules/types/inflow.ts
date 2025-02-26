import { z } from "zod";
import inflowSchema from "@/modules/schemas/inflow";

export type Inflow = z.infer<typeof inflowSchema>;

export type TableProps = {
    dataSource: Inflow[];
};