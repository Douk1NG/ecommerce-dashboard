import { z } from "zod";
import { filterSchema } from "@/features/filters/schemas/filters";

export type FormValues = z.infer<typeof filterSchema>;

export type FilterFormProps = {
    id: string;
    onSuccess?: () => void;
    filter?: FormValues;
};