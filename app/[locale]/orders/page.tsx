import { useTranslations } from "next-intl";
import { translations } from '@/i18n/request';
import Layout from "@/components/layout";

export default function Page() {
    const t = useTranslations(translations.orders);

    return (
        <Layout
            title={t('title')}
        >
            <></>
        </Layout>
    )
}