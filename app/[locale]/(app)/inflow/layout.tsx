import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next/types'
import type { GenerateMetadataProps, LayoutProps } from '@/src/shared/types/layout'

export async function generateMetadata(
    props: GenerateMetadataProps
): Promise<Metadata> {
    const params = await props.params
    const { locale } = params

    const t = await getTranslations({ locale })

    return {
        title: t('inflow.metadata.title'),
        description: t('inflow.metadata.description'),
    }
}

export default async function Layout({ children, sidebar }: LayoutProps) {
    return (
        <>
            {children}
            {sidebar}
        </>
    )
}
