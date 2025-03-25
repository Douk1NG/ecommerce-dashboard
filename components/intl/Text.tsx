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

    return <>{t(value, { params })}</>;
}