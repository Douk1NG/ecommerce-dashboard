'use client'

import Confirm from '@/components/layout/confirm';
import Icon from '@/components/icon';

import { getBasePath } from "@/lib/utils";
import { usePathname } from "@/i18n/routing";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useEditMode } from '@/hooks/use-edit-mode';

import CONSTANTS from '@/lib/constants';
import { toast } from '@/hooks/use-toast';

import IntlButton from '@/components/intl/ui/Button';

type PropTypes = {
    title: string;
    children: React.ReactNode
    onDelete: () => Promise<any>;
    isNew: boolean;
    translations: string;
    onEditModeChange?: (isEditing: boolean) => void;
    isEditing?: boolean;
};

const Index = ({
    title,
    children,
    isNew,
    onDelete,
    translations,
    onEditModeChange,
    isEditing = false
}: PropTypes) => {
    const t = useTranslations(translations)
    const pathname = usePathname();
    const router = useRouter();
    const base = getBasePath(pathname)
    const isDetail = !isNew && !isEditing


    const onConfirm = () => {
        router.push(`/${base}`, { scroll: true })
    }

    const onReturn = () => {
        onEditModeChange?.(false)
    }

    const onEdit = () => {
        onEditModeChange?.(true)
    }

    const onDeleteInternal = async () => {
        try {
            const response = await onDelete()
            const { success, message } = response

            const title = success ? '' : 'Ha ocurrido un error.'
            const variant = success ? 'default' : 'destructive'

            toast({
                title: title,
                description: message,
                variant: variant,
            })

            if (response.success) {
                router.push(`/${base}`)
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An error occurred while deleting',
                variant: 'destructive',
            })
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/30 z-10"
                onClick={onConfirm}
                aria-hidden="true"
            />

            {/* Sidebar */}
            <aside
                className="fixed right-0 top-0 z-20 h-screen w-full bg-white border-l-2 border-gray-100 shadow-2xs md:w-[70%] grid grid-rows-[auto_1fr] overflow-hidden"
                aria-label='sidebar'
            >
                {/* Header - Fixed */}
                <div className='flex justify-between items-center px-4 py-2 border-b'>
                    <h2 className='text-2xl font-medium leading-7 text-gray-900'>
                        {t(title)}
                    </h2>
                    <div className='flex items-center gap-2'>
                        {isDetail && (
                            <>
                                <IntlButton
                                    variant='outline'
                                    title='layout.sidebar.edit'
                                    onClick={onEdit}
                                    tooltip
                                >
                                    <Icon name='pencil' className='h-5 w-5' />
                                </IntlButton>
                                <Confirm
                                    translations={CONSTANTS.LAYOUT.CONFIRM.DELETE}
                                    icon='trash'
                                    onConfirm={onDeleteInternal}
                                />
                            </>
                        )}
                        {isDetail ? (
                            <IntlButton
                                variant='outline'
                                title={CONSTANTS.LAYOUT.SIDEBAR.CLOSE}
                                onClick={onConfirm}
                                tooltip
                            >
                                <Icon name='close' className='h-5 w-5' />
                            </IntlButton>
                        ) : (
                            <>
                                {!isNew && (
                                    <IntlButton
                                        variant='outline'
                                        title={CONSTANTS.LAYOUT.SIDEBAR.RETURN}
                                        onClick={onReturn}
                                        text
                                    >
                                        <Icon name='arrow-left' className='h-5 w-5' />
                                    </IntlButton>
                                )}
                                <Confirm
                                    translations={CONSTANTS.LAYOUT.CONFIRM.CLOSE}
                                    icon='close'
                                    onConfirm={onConfirm}
                                />
                            </>
                        )}
                    </div>
                </div>

                {/* Content - Scrollable */}
                <div className="overflow-y-auto px-4 py-4">
                    {children}
                </div>
            </aside>
        </>
    );
};

export default Index;
