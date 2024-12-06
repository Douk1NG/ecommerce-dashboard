import { useTranslations } from "next-intl";
import Layout from "@/components/layout";

import CategoriesTable from "./components/table";
import CONSTANTS from './resources/constants';
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