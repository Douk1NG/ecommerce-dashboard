const layout = (namespace?: string) => {
    return {
        ADD: 'add',
        DESCRIPTION: 'description',
        LINK: `/${namespace}/new`,
        NAMESPACE: 'layout',
        NEW: 'new',
        TITLE: 'title'
    }
}

const metadata = {
    NAMESPACE: 'metadata',
    TITLE: 'title',
    DESCRIPTION: 'description'
}

const breadcrumb = {
    NAMESPACE: 'breadcrumb',
    DEFAULT: 'default'
}

const LAYOUT_CONSTANTS = {
    LAYOUT: layout,
    METADATA: metadata,
    BREADCRUMB: breadcrumb,
}

export default LAYOUT_CONSTANTS