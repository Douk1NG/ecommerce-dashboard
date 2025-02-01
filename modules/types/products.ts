import { z } from "zod";
import productSchema from "@/modules/schemas/products";

export type Product = z.infer<typeof productSchema>;

export type TableProps = {
    dataSource: Product[];
};

export type FilterCombination = {
    price: number;
    filters: number[];
}

export type ProductFormData = {
    id?: number;
    name: string;
    description?: string;
    price: number;
    featured_product: boolean;
    categories: number[];
    active: boolean;
    main_image: File;
    related_images: File[];
    filter_combinations: FilterCombination[];
}