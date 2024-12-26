'use client'

import Confirm from '@/components/confirm';
import { Button } from '@/components/ui/button';
import Icon from '@/components/icon';

import { cleanSplit } from "@/lib/utils";
import { usePathname } from "@/i18n/routing";
import { useRouter, useSearchParams } from "next/navigation";
import CONSTANTS from '@/lib/constants';

type PropTypes = {
    title: string;
    children: React.ReactNode;
    isNew?: boolean;
};

const Index = ({ title, children, isNew }: PropTypes) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const isEdit = searchParams.get(CONSTANTS.LAYOUT.SIDEBAR.EDIT)
    const isDetail = !isNew && !isEdit

    const base = cleanSplit({
        value: pathname,
        criteria: '/'
    }).slice(0, -1).join('/')

    const onConfirm = () => {
        router.push(`/${base}`)
    }

    const onEdit = () => {
        router.push(`?${CONSTANTS.LAYOUT.SIDEBAR.EDIT}=${CONSTANTS.LAYOUT.SIDEBAR.IS_EDITING}`)
    }

    return (
        <div>
            <aside
                className="fixed right-0 top-0 z-20 h-screen w-full bg-white px-4 border-l-2 border-gray-100 shadow-sm md:w-[50%] grid grid-rows-[50px_1fr] py-2 gap-2"
                aria-label='sidebar'
            >
                <div className='flex justify-between items-center'>
                    <h2 className='text-2xl font-medium leading-7 text-gray-900 sm:truncate  sm:tracking-tight'>
                        {title}
                    </h2>
                    <div className='flex items-center gap-2'>
                        {isDetail &&
                            (
                                <Button
                                    variant='outline'
                                    title='Editar'
                                    type='button'
                                    onClick={onEdit}
                                >
                                    <Icon name='pencil' />
                                </Button>
                            )
                        }
                        {isDetail &&
                            (
                                <Confirm
                                    translations={CONSTANTS.LAYOUT.CONFIRM.DELETE}
                                    icon='trash'
                                    onConfirm={onConfirm}
                                />
                            )
                        }
                        <Confirm
                            translations={CONSTANTS.LAYOUT.CONFIRM.CLOSE}
                            icon='close'
                            onConfirm={onConfirm}
                        />
                    </div>
                </div>
                {children}
            </aside>
        </div>
    );
};

export default Index;
