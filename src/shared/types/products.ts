import { z } from "zod";
import productSchema from "@/src/features/products/productSchemas";
import type { Option } from "@/src/shared/types/select";

export type Product = z.infer<typeof productSchema>;

export type ProductDetail = {
    id?: number;
    name: string;
    description?: string;
    price?: string | number;
    featured_product?: boolean;
    active?: boolean;
    categories?: Array<Option & { filters?: Option[] }>;
    filter_combinations?: Array<{
        id?: number;
        price?: string | number;
        filters?: Option[];
    }>;
    images?: {
        values?: string[];
        preferred?: string | null;
    };
    images_preferred?: string | null;
};

export type ProductTableRow = {
    id?: number;
    name: string;
    price: number;
    active: boolean;
};

export type TableProps = {
    dataSource: ProductTableRow[];
};

export type FilterCombination = {
    id?: number;
    price?: number;
    filters?: number[];
}

export type ProductFormData = {
    id?: number;
    name: string;
    description: string;
    price: number;
    featured_product: boolean;
    categories: string[];
    active: boolean;
    images: File[];
    images_preferred: string;
    images_removed: string[];
    filter_combinations: FilterCombination[];
    main_image?: string;
    related_images?: File[];
}