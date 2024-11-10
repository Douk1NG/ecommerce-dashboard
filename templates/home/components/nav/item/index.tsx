import Link from 'next/link'
import Icon from "@/components/icon"
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { ItemProps } from '@/types/home/nav';

const GHOST_VARIANT = "ghost";
const DEFAULT_VARIANT = "default";
const OUTLINE_VARIANT = "outline";

const Item = ({
    title,
    href,
    icon,
    locale,
    isActive,
    isChild,
    expansible,
    onClick
}: ItemProps) => {

    const isActiveAndChild = isActive && isChild;

    const buttonVariant = isActiveAndChild ?
        OUTLINE_VARIANT :
        isActive ? DEFAULT_VARIANT : GHOST_VARIANT;

    return (
        <Link
            aria-label={title}
            title={title}
            href={href}
            className={cn(
                buttonVariants({ variant:buttonVariant }),
                "w-full justify-start gap-4 hover:bg-opacity-100",
                buttonVariant === GHOST_VARIANT && "hover:bg-foreground/5",
            )}
            locale={locale}
            onClick={onClick}
        >
            <Icon name={icon} color='currentColor' />
            {title}
            {expansible && (
                <Icon
                    className={cn("ml-auto")}
                    name={expansible}
                    color='currentColor'
                />
            )}
        </Link>
    )
}

export default Item