import { z } from "zod";
import filterSchema from "@/src/features/filters/filterSchemas";

export type Filter = z.infer<typeof filterSchema>;

export type TableProps = {
    dataSource: Filter[];
}

export type FilterFormData = {
    id?: number;
    name: string;
    filters: string[];
}