import { useTranslations } from "next-intl";
import { translations } from '@/i18n/request';
import Form from "@/features/filters/components/form";
import Sidebar from "@/components/sidebar";

export default function Page() {
    const t = useTranslations(translations.filters);

    return (
        <Sidebar
            title={t('layout.add')}
        >
            <Form/>
        </Sidebar>
    )
}