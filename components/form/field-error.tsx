import Icon from '@/components/icon'
import { cn } from '@/lib/utils'

interface FieldErrorProps {
    id: string
    error?: string
    className?: string
}

const FieldError = ({ id, error, className }: FieldErrorProps) => {
    if (!error) return null

    return (
        <p
            id={`${id}-error`}
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