import { useTranslations } from "next-intl";
import { translations } from '@/i18n/request';
import Layout from "@/components/layout";

export default function CategoriesPage() {
    const t = useTranslations(translations.categories);
    return (
        <Layout
            title={t('title')}
            action={{
                title: t('add'),
                href: '/categories/add'
            }}
        >
            <></>
        </Layout>
    )
}