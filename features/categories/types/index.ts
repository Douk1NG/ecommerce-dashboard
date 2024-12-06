import { z } from "zod";
import categorySchema from "../schemas";

export type Category = z.infer<typeof categorySchema>;

export type CategoryFormProps = {
    onSuccess?: () => void;
    category?: Category;
};

export type CategoryTableProps = {
    dataSource: Category[];
}

export type CategoryPageProps = {
    children: React.ReactNode;
}