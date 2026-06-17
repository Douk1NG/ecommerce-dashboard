import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import type { ActionResponse } from '@/src/shared/types/form'

export function useFormState(
    action: any,
    values: Record<string, unknown>,
    onEditModeChange?: (editing: boolean) => void,
    isEditing?: boolean,
    isCreating?: boolean
) {
    const actionWithId = action.bind(null, values?.['id'] as string)
    const router = useRouter()
    const isDetail = !isEditing && !isCreating
    const [
        state,
        formAction,
        isPending
    ] = useActionState(actionWithId, {
        success: false,
        message: '',
        errors: {},
        data: values
    } as ActionResponse)

    useEffect(() => {
        if (isDetail && state.success) {
            // antipattern but somehow it works
            state.success = false
            state.message = ''
            state.errors = {}
        }
    }, [isDetail])

    useEffect(() => {
        if (state.success) {
            toast({
                title: 'Success',
                description: state.message,
                variant: 'default',
                duration: 2000
            })

            if (isCreating) {
                router.push(`${state.data['id']}`)
                return
            }

            onEditModeChange?.(false)
        }
    }, [state.success, state.message, onEditModeChange])

    return {
        state,
        formAction,
        isPending,
        isDetail
    }
}