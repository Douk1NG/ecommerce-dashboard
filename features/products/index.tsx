import { useTranslations } from "next-intl";
import { translations } from '@/i18n/request';
import Layout from "@/components/layout";
import products from "@/features/products/resources/products.json"
import ProductTable from "./components/table";

interface PropsType {
    children: React.ReactNode;
}

export default function ProductsPage({ children }: PropsType) {
    const t = useTranslations(translations.products);

    return (
        <Layout
            title={t('layout.title')}
            action={{
                title: t('layout.add'),
                href: '/products/new',
            }}
            description={t('layout.description')}
        >
            <ProductTable dataSource={products}/>
            {children}
        </Layout>
    )
}