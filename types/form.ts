import { InputProps } from "@/components/ui/input";
import type { MultiSelectProps } from "@/components/ui/multiselect";
import type { SwitchProps } from "@radix-ui/react-switch";
import type { CurrencyInputProps } from "react-currency-input-field";

export type FieldType = 'text' | 'textarea' | 'currency' | 'multiselect' | 'file' | 'switch' | 'tagbox';

export interface BaseField {
    id?: string;
    label: string;
    name: string;
    description: string;
    placeholder?: string;
    value?: unknown;
}

export type TextField = BaseField & Omit<InputProps, 'type' | 'value'> & {
    type: 'text';
};

export type TextAreaField = BaseField & Omit<InputProps, 'type' | 'value'> & {
    type: 'textarea';
};

export type CurrencyField = BaseField & Omit<CurrencyInputProps, 'type' | 'value'> & {
    type: 'currency';
};

export type MultiselectField = BaseField & Omit<MultiSelectProps, 'type'> & {
    type: 'multiselect';
};

export type FileField = BaseField & Omit<InputProps, 'type' | 'value'> & {
    type: 'file';
};

export type SwitchField = BaseField & Omit<SwitchProps, 'type' | 'value'> & {
    type: 'switch';
};

export type TagboxField = BaseField & {
    type: 'tagbox';
};

export type Field =
    | TextField
    | TextAreaField
    | CurrencyField
    | MultiselectField
    | FileField
    | SwitchField
    | TagboxField;

export type Fields = Field[];

export type FormProps = {
    fields: Fields;
    values?: Record<string, unknown>;
    action: any;
    translations: string;
}