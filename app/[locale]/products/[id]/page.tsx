import { useTranslations } from "next-intl";
import { translations } from "@/i18n";
import Form from "@/features/products/components/form";
import Sidebar from "@/components/sidebar";

export default function Page() {
    const t = useTranslations(translations.products);
    return (
        <Sidebar
            title={t('add')}
        >
            <Form />
        </Sidebar>
    )
}