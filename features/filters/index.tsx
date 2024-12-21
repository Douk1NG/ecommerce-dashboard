import CONSTANTS from "@/features/filters/resources/constants";
import FiltersTable from "@/features/filters/components/table";
import Layout from "@/components/layout";
import { getTranslations } from "next-intl/server";
import { StaticPageProps } from "@/types/layout";
import { getFilters } from "@/features/filters/services";

export default async function Page(props: StaticPageProps) {
    const datasource = await getFilters()

    const t = await getTranslations({
        locale: props.locale,
        namespace: CONSTANTS.NAMESPACE
    });

    return (
        <Layout
            title={t(CONSTANTS.LAYOUT.TITLE)}
            action={{
                title: t(CONSTANTS.LAYOUT.ADD),
                href: CONSTANTS.LAYOUT.LINK
            }}
        >
            <FiltersTable dataSource={datasource} />
        </Layout>
    )
}