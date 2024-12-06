import { useTranslations } from "next-intl";
import Layout from "@/components/layout";

import InventoryTable from "./components/table";
import CONSTANTS from './resources/constants';
import type { InventoryPageProps } from "./types";

export default function InventoryPage({ children }: InventoryPageProps) {
    const t = useTranslations(CONSTANTS.NAMESPACE);
    return (
        <Layout
            title={t(CONSTANTS.LAYOUT.TITLE)}
        >
            <InventoryTable dataSource={[]} />
            {children}
        </Layout>
    )
}