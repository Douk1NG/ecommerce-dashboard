import { useTranslations } from "next-intl";
import type { IntlTextProps } from "@/types/intl";

export default function IntlText({
    value,
    params
}: IntlTextProps) {
    const t = useTranslations();

    if (!value) {
        return null;
    }

    if (params) {
        return <>{t(value, { params })}</>;
    }
    console.log(value)
    return <>{t(value)}</>;
}