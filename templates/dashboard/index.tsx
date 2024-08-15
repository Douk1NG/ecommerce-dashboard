import { useTranslations } from "next-intl";
import { translations } from "@/i18n";
import Layout from "@/components/layout/page";

export default function DashboardPage() {
    const t = useTranslations(translations.dashboard);

    return (
        <Layout
            title={t('title')}
        >
            <></>
        </Layout>
    )
}