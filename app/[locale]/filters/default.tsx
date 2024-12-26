import { PageProps } from "@/types/layout"
import Layout from "@/modules/components/filters"

export default async function Default(
    props: PageProps
) {
    const { locale } = await props.params
    return (
        <Layout
            locale={locale}
        />
    )
}