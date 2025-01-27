import { ImageUploaderProps } from "@/components/form/components/image-uploader";
import type { InputProps } from "@/components/ui/input";
import type { SwitchProps } from "@radix-ui/react-switch";
import type { CurrencyInputProps } from "react-currency-input-field";

export type FieldType = 'text' | 'textarea' | 'currency' | 'multiselect' | 'file' | 'switch' | 'tagbox' | 'select' | 'image';

export type Option = {
    value: string | number;
    label: string;
}

export interface BaseField {
    id?: string;
    label: string;
    name: string;
    description: string;
    placeholder?: string;
    value?: unknown;
    propagates?: {
        [x: string]: string;
    };
    readOnly?: boolean;
}

export type TextField = BaseField & Omit<InputProps, 'type' | 'value'> & {
    type: 'text';
};

export type SelectField = BaseField & {
    type: 'select';
    options?: Option[];
};

export type TextAreaField = BaseField & Omit<InputProps, 'type' | 'value'> & {
    type: 'textarea';
};

export type CurrencyField = BaseField & Omit<CurrencyInputProps, 'type' | 'value'> & {
    type: 'currency';
};

export type MultiselectField = BaseField & {
    type: 'multiselect';
    options?: Option[];
};

export type FileField = BaseField & Omit<InputProps, 'type' | 'value'> & {
    type: 'file';
};

export type SwitchField = BaseField & Omit<SwitchProps, 'type' | 'value'> & {
    type: 'switch';
};

export type TagboxField = BaseField & {
    type: 'tagbox';
    readOnly?: boolean;
};

export type ImageField = BaseField & ImageUploaderProps & {
    type: 'image';
};

export type Field =
    | TextField
    | TextAreaField
    | CurrencyField
    | MultiselectField
    | FileField
    | SwitchField
    | SelectField
    | TagboxField
    | ImageField;

export type Fields = Field[];

export type ActionResponse = {
    success: boolean;
    message: string;
    errors?: {
        [x: string]: string[] | undefined
    };
    data: Record<string, unknown>;
}

export type FormProps = {
    values?: Record<string, unknown>;
    fields: Fields;
    action: (id: string | undefined, prevState: ActionResponse | null, formData: FormData) => Promise<ActionResponse>;
    translations: (key: string) => string;
}