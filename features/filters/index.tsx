import { useTranslations } from "next-intl";
import { translations } from "@/i18n";
import Layout from "@/components/layout";

export default function FiltersPage() {
    const t = useTranslations(translations.filters);
    return (
        <Layout
            title={t('title')}
            action={{
                title: t('add'),
                href: '/filters/add'
            }}
        >
            <></>
        </Layout>
    )
}