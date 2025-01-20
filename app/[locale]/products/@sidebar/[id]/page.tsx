import CONSTANTS from "@/modules/constants/products";
import CONSTANTS_LIB from "@/lib/constants";
import Form from "@/modules/components/products/form";
import Sidebar from "@/components/sidebar";
import { getTranslations } from "next-intl/server";
import {
    getProduct,
    getProducts
} from "@/modules/services/products";
import { save } from "@/modules/actions/products";
import fields from "@/modules/fields/products";
import type { PageProps } from "@/types/layout";

export default async function Page(
    { params }: PageProps
) {
    const { id, locale } = await params
    const isNew = id === CONSTANTS_LIB.NEW

    const translations = await getTranslations({
        locale,
        namespace: CONSTANTS.NAMESPACE
    });

    const product = isNew ? undefined : await getProduct(id)
    const products = await getProducts()
    const fieldset = fields(products)

    return (
        <Sidebar
            isNew={isNew}
            title={translations(CONSTANTS.LAYOUT.TITLE)}
        >
            <Form
                product={product}
                fields={fieldset}
                action={save}
                translations={CONSTANTS.NAMESPACE}
            />
        </Sidebar>
    )
}