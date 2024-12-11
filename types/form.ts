import { TagProps } from "@/components/form/components/tagbox";
import { InputProps } from "@/components/ui/input";
import type { MultiSelectProps } from "@/components/ui/multiselect";
import type { SwitchProps } from "@radix-ui/react-switch";
import type { CurrencyInputProps } from "react-currency-input-field";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export type FieldType = 'text' | 'textarea' | 'currency' | 'multiselect' | 'file' | 'switch' | 'tagbox';

export interface BaseField<T> {
    label: string;
    name: Path<T>;
    description?: string;
    placeholder?: string;
}

export type TextField<T> = BaseField<T> & Omit<InputProps, 'type'> & {
    type: 'text';
};

export type TextAreaField<T> = BaseField<T> & Omit<InputProps, 'type'> & {
    type: 'textarea';
};

export type CurrencyField<T> = BaseField<T> & Omit<CurrencyInputProps, 'type'> & {
    type: 'currency';
};

export type MultiselectField<T> = BaseField<T> & Omit<MultiSelectProps, 'type'> & {
    type: 'multiselect';
};

export type FileField<T> = BaseField<T> & Omit<InputProps, 'type'> & {
    type: 'file';
};

export type SwitchField<T> = BaseField<T> & Omit<SwitchProps, 'type'> & {
    type: 'switch';
};

export type TagboxField<T> = BaseField<T> & Omit<TagProps, 'type'> & {
    type: 'tagbox';
};

export type Field<T> =
    | TextField<T>
    | TextAreaField<T>
    | CurrencyField<T>
    | MultiselectField<T>
    | FileField<T>
    | SwitchField<T>
    | TagboxField<T>;

export type Fields<T> = Field<T>[];

export type FormProps<T extends FieldValues> = {
    fields: Fields<T>;
    form: UseFormReturn<T>;
    onSubmit: (data: T) => void;
    translations: string;
}