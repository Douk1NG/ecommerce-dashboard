type Params = {
    id: string
    locale: string
}

export type GenerateMetadataProps = {
    params: Promise<Params>
}

export type LayoutProps = {
    children: React.ReactNode
    params: Promise<Params>
    sidebar: React.ReactNode
}

export type LoginLayoutProps = {
    children: React.ReactNode
    params: Promise<Params>
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