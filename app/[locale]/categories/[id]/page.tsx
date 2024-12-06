import { useTranslations } from "next-intl";
import Form from "@/features/categories/components/form";
import CONSTANTS from "@/features/categories/resources/constants";
import Sidebar from "@/components/sidebar";

export default function Page() {
    const t = useTranslations(CONSTANTS.NAMESPACE);

    return (
        <Sidebar title={t(CONSTANTS.SIDEBAR_TITLE)}>
            <Form/>
        </Sidebar>
    )
}