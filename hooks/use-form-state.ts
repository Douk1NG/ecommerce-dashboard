import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { getBasePath } from '@/lib/utils'

export function useFormState(action: any, values: any, pathname: string) {
    const router = useRouter()
    const base = getBasePath(pathname)

    const actionWithId = action.bind(null, values?.id as string)

    // @ts-ignore overload
    const [state, formAction, isPending] = useActionState(actionWithId, {
        success: false,
        message: '',
        errors: {},
        data: values
    })

    useEffect(() => {
        if (state.success) {
            toast({
                title: 'Success',
                description: state.message,
                variant: 'default'
            })
            router.push(`/${base}/${state.data?.id}`)
        }
    }, [state, base, router])

    return {
        state,
        formAction,
        isPending
    }
}