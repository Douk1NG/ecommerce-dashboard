'use client'
import ConfirmClose from '@/components/confirm';
import { useEffect } from 'react';

type PropTypes = {
    title: string;
    children: React.ReactNode;
};

const Index = ({ title, children }: PropTypes) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <aside
            className="fixed right-0 top-0 z-20 h-screen w-full bg-white px-4 border-l-2 border-gray-100 shadow-sm lg:w-[640px] sidebar py-2"
            aria-label='sidebar'
        >
            <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-medium leading-7 text-gray-900 sm:truncate  sm:tracking-tight'>
                    {title}
                </h2>
                <ConfirmClose />
            </div>
            <div className='mt-4 mb-4 overflow-y-auto overflow-x-hidden'>
                {children}
            </div>
        </aside>
    );
};

export default Index;
