import Link from 'next/link'
import Icon from "@/components/lazy-svg/client"
import { Icons } from '@/lib/types';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface PropTypes {
    title: string;
    href: string;
    icon: Icons;
    locale?: string;
    label?: string;
    isChild?: boolean;
    isActive?: boolean;
}

const GHOST_VARIANT = "ghost";
const DEFAULT_VARIANT = "default";
const OUTLINE_VARIANT = "outline";

const Item = ({
    title,
    href,
    icon,
    locale,
    label,
    isActive,
    isChild
}: PropTypes) => {

    const variant = isActive && isChild ?
    OUTLINE_VARIANT :
    isActive ? DEFAULT_VARIANT : GHOST_VARIANT;

    return (
        <Link
            aria-label={title}
            title={title}
            href={href}
            className={cn(
                buttonVariants({ variant }),
                "w-full justify-start gap-4 hover:bg-opacity-100",
                variant === GHOST_VARIANT && "hover:bg-foreground/5",
            )}
            locale={locale}
        >
            <Icon name={icon} color='currentColor'/>
            {title}
            {label && (
                <span className={cn("ml-auto")}>
                    {label}
                </span>
            )}
        </Link>
    )
}

export default Item