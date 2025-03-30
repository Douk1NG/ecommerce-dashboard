import { Locale } from "@/i18n/routing"

type Params = {
    id?: string
    locale: Locale
}

export type BaseLayoutProps = {
    children: React.ReactNode
    params: Promise<{
        locale: string
        id?: string
        searchParams?: { [key: string]: string | string[] | undefined }
    }>
}

export type LayoutProps = BaseLayoutProps & {
    sidebar: React.ReactNode
}

export type GenerateMetadataProps = LayoutProps

export type PageProps = BaseLayoutProps

export type PagePropsClient = BaseLayoutProps & {
    params: {
        locale: string
        id?: string
        searchParams?: { [key: string]: string | string[] | undefined }
    }
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