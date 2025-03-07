import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import IntlText from '@/components/intl/ui/Text'

import { cn } from '@/lib/utils'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import type { ButtonProps } from '@/components/ui/button'


export default function IntlButton({
    tooltip = false,
    ...props
}: ButtonProps & { tooltip?: boolean, text?: boolean }) {

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
                    <IntlText title={props.title} />
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
}: ButtonProps & { text?: boolean }) => {
    const translations = useTranslations()
    const intlTitle = translations(title)

    return (
        <Button
            title={intlTitle}
            type={type}
            className={cn('cursor-pointer', className)}
            {...props}
        >
            <div className='flex items-center gap-2'>
                {children}
                {text && intlTitle}
            </div>
        </Button>
    )
}
