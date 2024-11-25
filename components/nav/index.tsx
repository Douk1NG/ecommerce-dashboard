import {
    Sidebar,
    SidebarRail
} from "@/components/ui/sidebar"

import Content from "./content"
import Footer from "./footer"
import Header from "./header"

function Nav({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <Header />
            <Content />
            <Footer />
            <SidebarRail />
        </Sidebar>
    )
}

export default Nav