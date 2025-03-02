const CONSTANTS = {
    NEW: 'new',
    METADATA: {
        TITLE: 'metadata.title',
        DESCRIPTION: 'metadata.description'
    },
    TAGBOX: {
        NAMESPACE: 'layout.tagbox',
        KEY_ADD: 'add',
        KEY_REMOVE: 'remove',
        VALIDATION: {
            UNIQUE: {
                TITLE: 'validation.unique.title',
                DESCRIPTION: 'validation.unique.description'
            }
        },
        KEY_ENTER: 'enter'
    },
    LAYOUT: {
        NAMESPACE: 'layout',
        SIDEBAR: {
            EDIT: 'MODE',
            IS_EDITING: 'EDIT',
            CLOSE: 'layout.sidebar.close'
        },
        BREADCRUMB: {
            NAMESPACE: 'breadcrumb.default'
        },
        CONFIRM: {
            CLOSE: {
                NAMESPACE: 'layout.confirm.close',
                TITLE: 'layout.confirm.close.title',
                DESCRIPTION: 'layout.confirm.close.description',
                ACCEPT: 'layout.confirm.close.accept',
                CANCEL: 'layout.confirm.close.cancel',
                NAME: 'layout.confirm.close.name'
            },
            DELETE: {
                NAMESPACE: 'layout.confirm.delete',
                TITLE: 'layout.confirm.delete.title',
                DESCRIPTION: 'layout.confirm.delete.description',
                ACCEPT: 'layout.confirm.delete.accept',
                CANCEL: 'layout.confirm.delete.cancel',
                NAME: 'layout.confirm.delete.name'
            }
        },
        NAVBAR: {
            NAMESPACE: 'layout.navbar'
        },
        USERNAV: {
            NAMESPACE: 'layout.user',
            PROFILE: 'layout.user.profile',
            LOGOUT: 'layout.user.logout'
        },
        LOCALE_SWITCHER: {
            NAMESPACE: 'layout.locale',
            SWITCH: 'layout.locale.switch',
            LANGS: 'layout.locale.langs'
        }
    }
}

export default CONSTANTS