import { useTranslations } from "next-intl";
import { translations } from "@/i18n";
import Form from "@/features/filters/components/form";
import Sidebar from "@/components/sidebar";

export default function Page() {
    const t = useTranslations(translations.filters);
    const form = 'filters-form';

    return (
        <Sidebar
            form={form}
            title={t('add')}
        >
            <Form
                id={form}
            />
        </Sidebar>
    )
}