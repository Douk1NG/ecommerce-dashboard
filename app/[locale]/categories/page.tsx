import CONSTANTS from '@/features/categories/resources/constants';
import CategoriesTable from '@/features/categories/components/table';
import Layout from "@/components/layout";
import { useTranslations } from "next-intl";

export default function Page() {
    const t = useTranslations(CONSTANTS.NAMESPACE);
    return (
        <Layout
            title={t(CONSTANTS.LAYOUT.TITLE)}
            action={{
                title: t(CONSTANTS.LAYOUT.ADD),
                href: CONSTANTS.LAYOUT.LINK
            }}
        >
            <CategoriesTable dataSource={[]} />
        </Layout>
    )
}