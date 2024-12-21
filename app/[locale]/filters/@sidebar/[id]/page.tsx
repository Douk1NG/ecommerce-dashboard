import CONSTANTS from "@/features/filters/resources/constants";
import CONSTANTS_LIB from "@/lib/constants";
import Form from "@/features/filters/components/form";
import Sidebar from "@/components/sidebar";
import { getTranslations } from "next-intl/server";
import { getFilter } from "@/features/filters/services";

export default async function Page({ params }: any) {
    const { id, locale } = await params

    const t = await getTranslations({
        locale,
        namespace: CONSTANTS.NAMESPACE
    });

    const filter = id !== CONSTANTS_LIB.NEW ? await getFilter(id) : undefined

    return (
        <Sidebar
            title={t(CONSTANTS.LAYOUT.TITLE)}
        >
            <Form filter={filter} />
        </Sidebar>
    )
}