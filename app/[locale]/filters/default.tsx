import { PageProps } from "@/types/layout"
import Layout from "@/features/filters"

export default async function Default(props: PageProps) {
    const { locale } = await props.params
    return (
        <Layout
            locale={locale}
        />
    )
}