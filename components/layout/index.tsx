import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

interface PropsType {
    title?: string
    description?: string
    action?: {
        title: string
        href: string
    }
    children: React.ReactNode
}

const Index = ({ title, description, action, children }: PropsType) => {
    return (
        <>
            <div className="flex items-center justify-between space-y-2 mb-4 px-4 py-6 lg:px-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                    <small>{description}</small>
                </div>
                {action && (
                    <div className="flex items-center space-x-2">
                        <Link
                            href={action.href}
                            className={buttonVariants({ variant: "default" })}
                            scroll={false}
                        >
                            {action.title}
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