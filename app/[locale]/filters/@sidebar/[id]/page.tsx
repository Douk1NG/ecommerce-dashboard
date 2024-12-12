import CONSTANTS from "@/features/filters/resources/constants";
import Form from "@/features/filters/components/form";
import Sidebar from "@/components/sidebar";
import { getTranslations } from "next-intl/server";
import { getFilter } from "@/features/filters/services";
import { safeParseFloat } from "@/lib/utils";

export default async function Page({ params }: any) {
    const { id, locale } = await params

    const filter = safeParseFloat(id) ? await getFilter(id) : undefined

    const t = await getTranslations({
        locale,
        namespace: CONSTANTS.NAMESPACE
    });

    return (
        <Sidebar
            title={t(CONSTANTS.LAYOUT.TITLE)}
        >
            <Form filter={filter} />
        </Sidebar>
    )
}