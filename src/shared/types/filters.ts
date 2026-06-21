import { z } from "zod";
import filterSchema from "@/src/features/filters/filterSchemas";
import type { Option } from "@/src/shared/types/select";

export type Filter = z.infer<typeof filterSchema>;

export type FilterDetail = {
    id?: number;
    name: string;
    filters: string[] | Option[];
};

export type TableProps = {
    dataSource: Filter[];
}

export type FilterFormData = {
    id?: number;
    name: string;
    filters: string[];
}