'use client'

import Confirm from '@/components/layout/confirm';
import Icon from '@/components/layout/icon';
import { Button } from '@/components/ui/button';
import PropTypes from '@/src/shared/types/sidebar';
import { useSidebar } from '@/hooks/useSidebar';
import { useTranslations } from 'next-intl';

const Index = ({
    children,
    isNew,
    isEditing = false,
    title,
    onDelete,
    onEditModeChange,
    permissions = {
        edit: true,
        delete: true
    }
}: PropTypes) => {
    const {
        isDetail,
        handleConfirm,
        handleReturn,
        handleEdit,
        handleDelete
    } = useSidebar({
        isNew,
        isEditing,
        onDelete,
        ...(onEditModeChange !== undefined ? { onEditModeChange } : {})
    });
    const t = useTranslations();

    return (
        <>
            <div
                className="fixed inset-0 bg-black/30 z-10"
                onClick={handleConfirm}
                aria-hidden="true"
            />

            <aside
                className="fixed right-0 top-0 z-20 h-screen w-full bg-white border-l-2 border-gray-100 shadow-2xs md:w-[70%] grid grid-rows-[auto_1fr] overflow-hidden"
                aria-label='sidebar'
            >
                <div className='flex justify-between items-center px-4 py-2 border-b'>
                    <h2 className='text-2xl font-medium leading-7 text-gray-900'>
                        {t(title)}
                    </h2>
                    <div className='flex items-center gap-2'>
                        {isDetail && (
                            <>
                                {permissions.edit && (
                                    <Button
                                        variant='outline'
                                        title={t('layout.sidebar.edit')}
                                        onClick={handleEdit}
                                        className='cursor-pointer'
                                    >
                                        <Icon name='pencil' className='h-5 w-5' />
                                    </Button>
                                )}
                                {permissions.delete && (
                                    <Confirm
                                        translations={{
                                            cancel: 'layout.confirm.delete.cancel',
                                            accept: 'layout.confirm.delete.accept',
                                            title: 'layout.confirm.delete.title',
                                            description: 'layout.confirm.delete.description',
                                            name: 'layout.confirm.delete.name'
                                        }}
                                        icon='trash'
                                        onConfirm={handleDelete}
                                    />
                                )}
                            </>
                        )}
                        {isDetail ? (
                            <Button
                                variant='outline'
                                title={t('layout.sidebar.close')}
                                onClick={handleConfirm}
                                className='cursor-pointer'
                            >
                                <Icon name='x' className='h-5 w-5' />
                            </Button>
                        ) : (
                            <>
                                {!isNew && (
                                    <Button
                                        variant='outline'
                                        title={t('layout.sidebar.return')}
                                        onClick={handleReturn}
                                        className='cursor-pointer'
                                    >
                                        <div className='flex items-center gap-2'>
                                            <Icon name='arrow-left' className='h-5 w-5' />
                                            {t('layout.sidebar.return')}
                                        </div>
                                    </Button>
                                )}
                                <Confirm
                                    translations={{
                                        cancel: 'layout.confirm.close.cancel',
                                        accept: 'layout.confirm.close.accept',
                                        title: 'layout.confirm.close.title',
                                        description: 'layout.confirm.close.description',
                                        name: 'layout.confirm.close.name'
                                    }}
                                    icon='x'
                                    onConfirm={handleConfirm}
                                />
                            </>
                        )}
                    </div>
                </div>

                <div className="overflow-y-auto px-4 py-4">
                    {children}
                </div>
            </aside>
        </>
    );
};

export default Index;
