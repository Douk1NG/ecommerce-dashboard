import { z } from "zod";
import categorySchema from "@/src/features/categories/categorySchemas";
import type { Option } from "@/src/shared/types/select";

export type Category = z.infer<typeof categorySchema>;

export type CategoryDetail = {
    id?: number;
    name: string;
    description?: string;
    featured_category?: boolean;
    parent_id?: string | Option;
    filters?: string[] | Option[];
    image?: File | string | null;
};

export type TableProps = {
    dataSource: Category[];
}

export type CategoryFormData = {
    id?: number;
    name: string;
    description?: string;
    featured_category?: boolean;
    parent_id?: string;
    filters?: FormDataEntryValue[];
    image?: File;
    external_images?: string;
}