'use client'
import { useState } from "react"
import { Nav, NavItem } from "./components/nav/"
import Header from "./components/header"
import { translations } from "@/i18n"
import links from './resources/links.json'

interface PropTypes {
    children: React.ReactNode
}

const Layout = ({
    children
}: PropTypes) => {

    const [visible, setVisible] = useState(false)

    const onToggle = () => {
        setVisible(!visible)
    }

    return (
        <>
            <Header onToggleNavBar={onToggle} />
            <aside>
                <Nav
                    translations={translations.navbar}
                    links={links as NavItem[]}
                    visible={visible}
                />
            </aside>
            <main className="col-span-full md:col-[2] row-[2] overflow-auto h-full px-4 py-6 lg:px-8">
                {children}
            </main>
            {visible &&
                <div
                    className="md:hidden fixed w-full h-full bg-black/50 z-10 left-60 top-20"
                    onClick={onToggle}
                />
            }
        </>
    )
}

export default Layout