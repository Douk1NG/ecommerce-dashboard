import { z } from "zod";
import filterSchema from "@/modules/schemas/filters";

export type Filter = z.infer<typeof filterSchema>;

export type TableProps = {
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
