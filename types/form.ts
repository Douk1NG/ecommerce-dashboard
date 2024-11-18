import type {
    FieldValues,
    UseFormReturn
} from "react-hook-form";

export type FieldType = 'text' | 'textarea' | 'currency' | 'tagbox' | 'file' | 'switch';

export type Field = {
    type: FieldType;
    label: string;
    description: string;
    name: string;
}

export type Fields = Field[];

export type FormProps<T extends FieldValues> = {
    fields: Fields;
    form: UseFormReturn<T>;
    onSubmit: (data: T) => void;
}