import { z } from "zod";
import productSchema from "@/src/features/products/productSchemas";

export type Product = z.infer<typeof productSchema>;

export type TableProps = {
    dataSource: Product[];
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