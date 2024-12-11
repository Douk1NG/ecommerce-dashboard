import CONSTANTS from "./resources/constants";
import FiltersTable from "@/features/filters/components/table";
import Layout from "@/components/layout";
import { useTranslations } from "next-intl";
import type { FilterPageProps } from "./types";

export default function FiltersPage({ children }: FilterPageProps) {
    const t = useTranslations(CONSTANTS.NAMESPACE);
    return (
        <Layout
            title={t(CONSTANTS.LAYOUT.TITLE)}
            action={{
                title: t(CONSTANTS.LAYOUT.ADD),
                href: CONSTANTS.LAYOUT.LINK
            }}
        >
            <FiltersTable dataSource={[]}/>
            {children}
        </Layout>
    )
}