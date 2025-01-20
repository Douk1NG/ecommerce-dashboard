import { z } from "zod";
import categorySchema from "@/modules/schemas/categories";

export type Category = z.infer<typeof categorySchema>;

export type TableProps = {
    dataSource: Category[];
}

export interface CategoryFormData {
    id?: number;
    name: string;
    subcategories: string;
    filters: string;
}

export interface ActionResponse {
    success: boolean;
    message: string;
    errors?: {
        [K in keyof CategoryFormData]?: string[];
    };
    data?: CategoryFormData;
}
