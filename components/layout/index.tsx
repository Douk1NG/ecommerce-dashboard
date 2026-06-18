import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { useTranslations } from "next-intl"
import type { LayoutContentProps } from "@/src/shared/types/layout"

const Index = ({
    module,
    translations,
    action,
    children
}: LayoutContentProps) => {
    const t = useTranslations()

    return (
        <>
            <div className="flex items-center justify-between space-y-2 mb-4 px-4 py-6 lg:px-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        {translations.title && t(translations.title)}
                    </h2>
                    <small>
                        {translations.description && t(translations.description)}
                    </small>
                </div>
                {action && (
                    <div className="flex items-center space-x-2">
                        <Link
                            href={`/${module}/new`}
                            className={buttonVariants({ variant: "default" })}
                            type="button"
                            scroll={false}
                        >
                            {translations.add && t(translations.add)}
                        </Link>
                    </div>
                )}
            </div>
            <div className="px-4 py-6 lg:px-8">
                {children}
            </div>
        </>
    )
}

export default Index