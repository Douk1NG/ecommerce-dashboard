'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
            disabled={pending}
        >
            {pending ? 'Signing in...' : 'Sign in'}
        </Button>
    )
}


export default SubmitButton