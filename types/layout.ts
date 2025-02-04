export type GenerateMetadataProps = {
    params?: Promise<any>
}

export type LayoutProps = {
    children: React.ReactNode;
    params?: Promise<{
        id: string
        locale: string
    }>
    sidebar?: React.ReactNode
}

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
    title?: string
    description?: string
    action?: {
        title: string
        href: string
    }
    children: React.ReactNode
}