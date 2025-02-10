import type { ImageUploaderProps } from "@/types/components/image-uploader";
import type { Option } from "@/types/components/select";

export type FieldType = 'text' | 'select' | 'textarea' | 'currency' | 'multiselect' | 'switch' | 'tagbox' | 'image' | 'group';

export interface BaseField {
    id?: string;
    label: string;
    name: string;
    description?: string;
    placeholder?: string;
    value?: unknown;
    inheritFrom?: {
        field: string;
        property: string;
    };
    readOnly?: boolean;
    onChange?: (value: unknown) => void;
    defaultValue?: unknown;
}

export interface WithOptions {
    options?: Option[];
}

export type TextField = BaseField & {
    type: 'text';
};

export type SelectField = BaseField & WithOptions & {
    type: 'select';
};

export type TextAreaField = BaseField & {
    type: 'textarea';
};

export type CurrencyField = BaseField & {
    type: 'currency';
};

export type MultiselectField = BaseField & WithOptions & {
    type: 'multiselect';
};

export type SwitchField = BaseField & {
    type: 'switch';
};

export type TagboxField = BaseField & {
    type: 'tagbox';
};

export type ImageField = BaseField & ImageUploaderProps & {
    type: 'image';
};

export type GroupField = BaseField & {
    type: 'group';
};

export type Field =
    | TextField
    | TextAreaField
    | GroupField
    | CurrencyField
    | MultiselectField
    | SwitchField
    | SelectField
    | TagboxField
    | ImageField;

export type Fields = Field[];

export type ActionResponse = {
    success: boolean;
    message: string;
    errors?: {
        [x: string]: string[] | undefined;
    };
    data: Record<string, unknown>;
}

export type FormProps = {
    values?: Record<string, unknown>;
    fields: Fields;
    action: (
        id: string | undefined,
        prevState: ActionResponse | null,
        formData: FormData
    ) => Promise<ActionResponse>;
    translations: (key: string) => string;
}