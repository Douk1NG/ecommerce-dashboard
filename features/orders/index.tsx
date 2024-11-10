import { useTranslations } from "next-intl";
import { translations } from "@/i18n";
import Layout from "@/components/layout";

export default function OrdersPage() {
    const t = useTranslations(translations.orders);
    return (
        <Layout
            title={t('title')}
        >
            <></>
        </Layout>
    )
}