import { useState } from 'react'

type UseEditModeProps = {
    isNew?: boolean
}

type UseEditModeReturn = {
    isEditing: boolean
    isDetail: boolean
    handleEditModeChange: (editing: boolean) => void
    setEditing: (value: boolean) => void
}

export const useEditMode = ({ isNew = false }: UseEditModeProps = {}): UseEditModeReturn => {
    const [isEditing, setEditing] = useState(false)
    const isDetail = !isNew && !isEditing

    const handleEditModeChange = (editing: boolean) => {
        setEditing(editing)
    }

    return {
        isEditing,
        isDetail,
        handleEditModeChange,
        setEditing
    }
}