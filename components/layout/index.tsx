import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import IntlText from "@/components/intl/Text"
import LayoutConstants from '@/src/shared/constants/layout';
import type { LayoutContentProps } from "@/src/shared/types/layout"

const Index = ({
    module,
    translations,
    action,
    children
}: LayoutContentProps) => {
    return (
        <>
            <div className="flex items-center justify-between space-y-2 mb-4 px-4 py-6 lg:px-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        {translations.title && <IntlText value={translations.title}/>}
                    </h2>
                    <small>
                        {translations.description && <IntlText value={translations.description} />}
                    </small>
                </div>
                {action && (
                    <div className="flex items-center space-x-2">
                        <Link
                            href={`/${module}/${LayoutConstants.LAYOUT.NEW}`}
                            className={buttonVariants({ variant: "default" })}
                            type="button"
                            scroll={false}
                        >
                            {translations.add && <IntlText value={translations.add} />}
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