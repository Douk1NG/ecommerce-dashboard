import { IntlTextProps } from "@/types/intl";

export function getIntlText({
    module,
    namespace,
    value
}: IntlTextProps) {
    const key = []

    if (module) {
        key.push(module)
    }

    if (namespace) {
        key.push(namespace)
    }

    key.push(value)

    return key.join('.')
}
