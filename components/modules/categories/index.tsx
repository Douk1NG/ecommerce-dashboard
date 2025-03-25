import Layout from "@/components/layout";
import Table from "@/components/modules/categories/table";
import constants from "@/constants/categories";
import translations from "@/constants/translations/categories";

import {
    getCategories
} from "@/services/categories";

export default async function Page() {
    const datasource = await getCategories()

    return (
        <Layout
            module={constants.NAMESPACE}
            translations={translations.layout}
            action
        >
            <Table
                dataSource={datasource}
            />
        </Layout>
    )
}