import { useTranslations } from "next-intl";

export default function IntlText({ title }: { title?: string }) {
    const t = useTranslations();
    return <>{title ? t(title) : ''}</>;
}

