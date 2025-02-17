import { z } from "zod";
import categorySchema from "@/modules/schemas/categories";

export type Category = z.infer<typeof categorySchema>;

export type TableProps = {
    dataSource: Category[];
}

export type CategoryFormData = {
    id?: number;
    name: string;
    description?: string;
    featured_category?: boolean;
    parent_id?: string;
    filters?: number[];
    image?: File;
    external_images?: string;
}