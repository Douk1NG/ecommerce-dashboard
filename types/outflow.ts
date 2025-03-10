import { z } from "zod";
import outflowSchema from "@/schemas/outflow";

export type Outflow = z.infer<typeof outflowSchema>;

export type TableProps = {
    dataSource: Outflow[];
};