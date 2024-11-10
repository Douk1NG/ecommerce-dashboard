'use client'

import { Nav, Header } from "./components"
import { translations } from "@/i18n"
import { useRef } from "react"

import links from './resources/links.json'
import user from './resources/user.json'

import type {
    NavItem
} from "@/types/home/nav"

interface PropTypes {
    children: React.ReactNode
}

const Layout = ({
    children
}: PropTypes) => {

    const navbarRef = useRef(null);

    return (
        <>
            <Header navRef={navbarRef} user={user} />
            <aside>
                <Nav
                    navRef={navbarRef}
                    translations={translations.navbar}
                    links={links as NavItem[]}
                />
            </aside>
            <main className="col-span-full md:col-[2] row-[2] overflow-auto h-full px-4 py-6 lg:px-8">
                {children}
            </main>
        </>
    )
}

export default Layout