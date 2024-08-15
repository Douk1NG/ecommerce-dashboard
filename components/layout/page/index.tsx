import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
interface PropsType {
    title: string
    action?: {
        title: string
        href: string
    }
    children: React.ReactNode
}

const Index = ({ title, action, children }: PropsType) => {
    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
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
            {children}
        </>
    )
}

export default Index