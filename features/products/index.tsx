import { useTranslations } from "next-intl";
import { translations } from "@/i18n";
import Layout from "@/components/layout";
import List from "@/components/list";
import products from "./resources/products.json";
interface PropsType {
    children: React.ReactNode;
}

export default function ProductsPage({ children }: PropsType) {
    const t = useTranslations(translations.products);

    return (
        <Layout
            title={t('title')}
            action={{
                title: t('add'),
                href: '/products/new',
            }}
        >
            <List
                items={products}
            />
            {children}
        </Layout>
    )
}