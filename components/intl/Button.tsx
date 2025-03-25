import { Button } from '@/components/ui/button'
import IntlText from '@/components/intl/Text'
import { useIntlText } from '@/hooks/use-intl-text'

import { cn } from '@/lib/utils'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import type { IntlButtonProps } from '@/types/intl'

export default function IntlButton({
    tooltip = false,
    ...props
}: IntlButtonProps) {

    if (!tooltip) {
        return <BaseButton {...props} />
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <BaseButton {...props} />
                </TooltipTrigger>
                <TooltipContent>
                    <IntlText value={props.title} />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

const BaseButton = ({
    children,
    type = 'button',
    title,
    text = false,
    className,
    ...props
}: IntlButtonProps) => {
    return (
        <Button
            title={useIntlText(title) as string}
            type={type}
            className={cn('cursor-pointer', className)}
            {...props}
        >
            <div className='flex items-center gap-2'>
                {children}
                {text && <IntlText value={title} />}
            </div>
        </Button>
    )
}
