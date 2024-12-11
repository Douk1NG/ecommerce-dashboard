
import CONSTANTS from './resources/constants';
import CategoriesTable from "./components/table";
import Layout from "@/components/layout";
import { useTranslations } from "next-intl";
import type { CategoryPageProps } from "./types";

export default function CategoriesPage({ children }: CategoryPageProps) {
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
            {children}
        </Layout>
    )
}