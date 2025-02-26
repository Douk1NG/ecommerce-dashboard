import { PageProps } from "@/types/layout"
import Layout from "@/modules/components/inflow"

export default async function Page(props: PageProps) {
    const { locale } = await props.params
    return (
        <Layout
            locale={locale}
        />
    )
}