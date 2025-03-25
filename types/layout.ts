import { Locale } from "@/i18n/routing"

type Params = {
    id?: string
    locale: Locale
}

export type BaseLayoutProps = {
    children: React.ReactNode
    params: Promise<Params>
}

export type LayoutProps = BaseLayoutProps & {
    sidebar: React.ReactNode
}

export type GenerateMetadataProps = LayoutProps

export type PageProps = {
    params: Promise<{
        id: string
        locale: string
    }>
}

export type StaticPageProps = {
    locale: string
}

export type LayoutContentProps = {
    module: string
    translations: {
        add?: string
        title: string
        description?: string
    }
    action?: boolean
    children: React.ReactNode
}