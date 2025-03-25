import Layout from "@/components/layout";
import Table from "@/components/modules/filters/table";
import constants from "@/constants/filters";
import translations from "@/constants/translations/filters";

import {
    getFilters
} from "@/services/filters";

export default async function Page() {
    const datasource = await getFilters()

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