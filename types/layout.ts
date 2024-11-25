import { Locale } from "@/i18n/routing";

export type GenerateMetadataProps = {
    params: { locale: Locale };
}

export type LayoutProps = {
    children: React.ReactNode;
}