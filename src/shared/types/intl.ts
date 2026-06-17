import { TranslationValues } from "next-intl"
import type { ButtonProps } from "@/components/ui/button"

export type IntlTextProps = {
    value?: string,
    params?: TranslationValues['params']
}

export type IntlButtonProps = ButtonProps & {
    tooltip?: boolean,
    text?: boolean,
    value?: string,
    params?: TranslationValues['params']
}