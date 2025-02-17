import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import type { ButtonProps } from '@/components/ui/button'

export default function IntlButton({
    children,
    type = 'button',
    title,
    showTitle = false,
    ...props
}: ButtonProps & { showTitle?: boolean }) {
    const translations = useTranslations()

    return (
        <Button
            title={translations(title)}
            type={type}
            {...props}
        >
            {showTitle && translations(title)}
            {children}
        </Button>
    )
}