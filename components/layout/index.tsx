import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import IntlText from "@/components/intl/Text"
import LayoutConstants from '@/constants/layout';
import type { LayoutContentProps } from "@/types/layout"

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
                        <IntlText value={translations.title}/>
                    </h2>
                    <small>
                        <IntlText value={translations.description} />
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
                            <IntlText value={translations.add} />
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