import { z } from "zod";
import filterSchema from "@/features/filters/schemas";

export type Filter = z.infer<typeof filterSchema>;

export type FilterFormProps = {
    onSuccess?: () => void;
    filter?: Filter;
};

export type FilterTableProps = {
    dataSource: Filter[];
}