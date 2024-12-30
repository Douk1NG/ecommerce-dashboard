import { z } from "zod";
import filterSchema from "@/modules/schemas/filters";
import { Fields } from "@/types/form";

export type Filter = z.infer<typeof filterSchema>;

export type FilterFormProps = {
    filter?: Filter;
    fields: Fields;
    translations: string;
    action: any;
};

export type FilterTableProps = {
    dataSource: Filter[];
}

export interface FilterFormData {
    id?: number;
    name: string;
    filters: string;
}

export interface ActionResponse {
    success: boolean;
    message: string;
    errors?: {
        [K in keyof FilterFormData]?: string[];
    };
    data?: FilterFormData;
}
