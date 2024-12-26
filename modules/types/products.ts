import { z } from "zod";
import productSchema from "@/modules/schemas/products";
import { Fields } from "@/types/form";

export type Product = z.infer<typeof productSchema>;

export type ProductFormProps = {
    product?: Product;
    fields: Fields;
    action: any;
    translations: string;
};

export type ProductTableProps = {
    dataSource: Product[];
}

export type ProductFormData = {
    id: number;
    name: string;
    description: string;
    price: number;
    featured_product: boolean;
    categories: number[];
    active: boolean;
    main_image: File;
    related_images: File[];
}

export interface ActionResponse {
    success: boolean;
    message: string;
    errors?: {
        [K in keyof ProductFormData]?: string[];
    };
}

