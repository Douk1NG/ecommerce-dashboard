import { z } from "zod";
import productSchema from "@/features/products/schemas/product";

export type Product = z.infer<typeof productSchema>;

export type ProductFormProps = {
    onSuccess?: () => void;
    product?: Product;
};

export type ProductTableProps = {
    dataSource: Product[];
}