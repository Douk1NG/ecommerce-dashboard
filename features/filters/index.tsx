import { useTranslations } from "next-intl";
import { translations } from '@/i18n/request';
import Layout from "@/components/layout";
import FiltersTable from "@/features/filters/components/table";

interface PropsType {
    children: React.ReactNode;
}

export default function FiltersPage({ children }: PropsType) {
    const t = useTranslations(translations.filters);
    return (
        <Layout
            title={t('layout.title')}
            action={{
                title: t('layout.add'),
                href: '/filters/add'
            }}
        >
            <FiltersTable dataSource={[]}/>
            {children}
        </Layout>
    )
}