import Icon from '@/components/layout/icon'
import { cn } from '@/src/shared/lib/utils'

interface FieldErrorProps {
    error?: string
    className?: string
}

const FieldError = ({ error, className }: FieldErrorProps) => {
    if (!error) return null

    return (
        <p
            className={cn(
                'text-sm text-red-500 flex items-center gap-1.5',
                className
            )}
        >
            <Icon name="circle-x" className="h-4 w-4" />
            {error}
        </p>

    )
}

export default FieldError