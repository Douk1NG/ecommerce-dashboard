import { useTranslations } from "next-intl";
import { getIntlText } from "@/utils/intl";
import type { IntlTextProps } from "@/types/intl";

export default function IntlText({
    module = '',
    namespace = '',
    value,
    params
}: IntlTextProps) {
    const t = useTranslations();

    if (!value) {
        return null;
    }

    const key = getIntlText({
        module,
        namespace,
        value
    })

    return <>{t(key, { params })}</>;
}