'use client'
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { translations } from '@/i18n';
import { Button } from '@/components/ui/button';
import Dialog from '@/components/dialog';

type PropTypes = {
    title: string;
    children: React.ReactNode;
};

const Index = ({ title, children }: PropTypes) => {
    const t = useTranslations(translations.sidebar);
    const router = useRouter();

    function onClose() {
        router.back();
    }

    function onClick() {

    }

    return (
        <section>
            <aside
                className="fixed right-0 top-0 z-20 h-screen w-full bg-white p-4 border-l-2 border-gray-100 shadow-sm lg:w-[640px] sidebar"
                aria-label='sidebar'
            >
                <div className='flex justify-between items-center'>
                    <h2 className='text-2xl font-medium leading-7 text-gray-900 sm:truncate  sm:tracking-tight'>
                        {title}
                    </h2>
                    <Button
                        onClick={onClose}
                        variant='outline'
                        title={t('close')}
                        type='button'
                    >
                        {t('close')}
                    </Button>
                </div>
                <div className='mt-4 mb-4 overflow-y-auto overflow-x-hidden'>
                    {children}
                </div>
                <div className='flex justify-end gap-4'>
                    <Dialog onConfirm={onClose} />
                    <Button onClick={onClick}>{t('accept')}</Button>
                </div>
            </aside>
        </section>
    );
};

export default Index;
