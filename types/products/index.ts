import { z } from "zod";
import { productSchema } from "@/features/products/schemas/product";

export type FormValues = z.infer<typeof productSchema>;

export type ProductFormProps = {
    id: string;
    onSuccess?: () => void;
    product?: FormValues;
};