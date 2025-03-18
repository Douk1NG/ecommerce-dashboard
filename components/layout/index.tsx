import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import IntlText from "@/components/intl/Text"
import LAYOUT_CONSTANTS from "@/constants/layout"

import type { LayoutContentProps } from "@/types/layout"

const Index = ({
    module,
    action,
    children
}: LayoutContentProps) => {
    const constants = LAYOUT_CONSTANTS.LAYOUT(module)
    return (
        <>
            <div className="flex items-center justify-between space-y-2 mb-4 px-4 py-6 lg:px-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        <IntlText
                            module={module}
                            namespace={constants.NAMESPACE}
                            value={constants.TITLE}
                        />
                    </h2>
                    <small>
                        <IntlText
                            module={module}
                            namespace={constants.NAMESPACE}
                            value={constants.DESCRIPTION}
                        />
                    </small>
                </div>
                {action && (
                    <div className="flex items-center space-x-2">
                        <Link
                            href={constants.LINK}
                            className={buttonVariants({ variant: "default" })}
                            type="button"
                            scroll={false}
                        >
                            <IntlText
                                module={module}
                                namespace={constants.NAMESPACE}
                                value={constants.ADD}
                            />
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