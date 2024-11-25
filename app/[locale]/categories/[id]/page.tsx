import { useTranslations } from "next-intl";
import { translations } from '@/i18n/request';
import Form from "@/features/categories/components/form";
import Sidebar from "@/components/sidebar";

export default function Page() {
    const t = useTranslations(translations.categories);
    const form = 'categories-form';

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