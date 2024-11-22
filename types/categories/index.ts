import { z } from "zod";
import { categorySchema } from "@/features/categories/schemas/category";

export type FormValues = z.infer<typeof categorySchema>;

export type CategoryFormProps = {
    id: string;
    onSuccess?: () => void;
    category?: FormValues;
};