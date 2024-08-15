import type { Metadata, ResolvingMetadata } from 'next'
import { localize } from "@/i18n";

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

type LayoutProps = {
    children: React.ReactNode
}

export default function LoginLayout({ children }: LayoutProps) {
    return (
        <main>{children}</main>
    );
}

// export async function generateMetadata(
//     { params, searchParams }: Props,
//     parent: ResolvingMetadata
// ): Promise<Metadata> {
//     // read route params
//     // const id = params.id

//     return {
//         title: localize("login.title", 'es'),
//         description: localize("login.description", 'es'),
//     }
// }