import { TranslationValues } from "next-intl"
import type { ButtonProps } from "@/components/ui/button"

export type IntlTextProps = {
    module?: string,
    namespace?: string,
    value?: string,
    params?: TranslationValues['params']
}

export type IntlButtonProps = ButtonProps & {
    tooltip?: boolean,
    text?: boolean,
    module?: string,
    namespace?: string,
    value?: string,
    params?: TranslationValues['params']
}