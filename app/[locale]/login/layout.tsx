import type { LayoutProps } from "@/types/layout";

export default function LoginLayout({ children }: LayoutProps) {
    return (
        <main>{children}</main>
    );
}