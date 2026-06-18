import Icon from "@/components/layout/icon";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function FormSubmitButton({ isPending }: { isPending: boolean }) {
    const t = useTranslations();
    return (
        <div className='flex justify-end gap-4'>
            <Button
                type='submit'
                disabled={isPending}
                className='cursor-pointer'
                title={t('layout.sidebar.save')}
            >
                <div className='flex items-center gap-2'>
                    {isPending && <Icon name='loader' className='animate-spin mr-2 h-4 w-4' />}
                    {t('layout.sidebar.save')}
                </div>
            </Button>
        </div>
    )
}