'use client'

import Confirm from '@/components/layout/confirm';
import Icon from '@/components/icon';

import { getBasePath } from "@/lib/utils";
import { usePathname } from "@/i18n/routing";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from 'react';

import CONSTANTS from '@/lib/constants';
import { toast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import IntlButton from '../intl/ui/Button';

type PropTypes = {
    title: string;
    children: React.ReactNode
    onDelete: () => Promise<any>;
    isNew: boolean
    translations: string
};

const Index = ({ title, children, isNew, onDelete, translations }: PropTypes) => {
    const t = useTranslations(translations)
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const base = getBasePath(pathname)
    const isEdit = searchParams.get(CONSTANTS.LAYOUT.SIDEBAR.EDIT)
    const isDetail = !isNew && !isEdit

    const onConfirm = () => {
        router.push(`/${base}`)
    }

    const onEdit = () => {
        router.push(`?${CONSTANTS.LAYOUT.SIDEBAR.EDIT}=${CONSTANTS.LAYOUT.SIDEBAR.IS_EDITING}`)
    }

    const onDeleteInternal = async () => {
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
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    return (
        <div>
            <aside
                className="fixed right-0 top-0 z-20 h-screen w-full bg-white px-4 border-l-2 border-gray-100 shadow-2xs md:w-[70%] grid grid-rows-[50px_1fr] py-2 gap-2 overflow-y-auto"
                aria-label='sidebar'
            >
                <div className='flex justify-between items-center'>
                    <h2 className='text-2xl font-medium leading-7 text-gray-900'>
                        {t(title)}
                    </h2>
                    <div className='flex items-center gap-2'>
                        {isDetail &&
                            (
                                <IntlButton
                                    variant='outline'
                                    title='layout.sidebar.edit'
                                    onClick={onEdit}
                                >
                                    <Icon name='pencil' />
                                </IntlButton>
                            )
                        }
                        {isDetail &&
                            (
                                <Confirm
                                    translations={CONSTANTS.LAYOUT.CONFIRM.DELETE}
                                    icon='trash'
                                    onConfirm={onDeleteInternal}
                                />
                            )
                        }
                        {isDetail ? (
                            <IntlButton
                                variant='outline'
                                title='layout.sidebar.close'
                                onClick={onConfirm}
                            >
                                <Icon name='close' />
                            </IntlButton>
                        ) : (
                            <Confirm
                                translations={CONSTANTS.LAYOUT.CONFIRM.CLOSE}
                                icon='close'
                                onConfirm={onConfirm}
                            />
                        )}
                    </div>
                </div>
                {children}
            </aside>
        </div>
    );
};

export default Index;
