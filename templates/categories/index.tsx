import { useTranslations } from "next-intl";
import { translations } from "@/i18n";
import Layout from "@/components/layout/page";

export default function CategoriesPage() {
    const t = useTranslations(translations.categories);
    return (
        <Layout
            title={t('title')}
            // action={t('add')}
        >
            <></>
        </Layout>
    )
}