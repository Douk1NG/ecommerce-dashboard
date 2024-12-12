import { useTranslations } from "next-intl";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { translations } from '@/i18n/request';

export default function Index() {
    const t = useTranslations(translations.dialog);
    const router = useRouter();
    const title = 'close'

    const onConfirm = () => {
        router.back()
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    type='button'
                    title={t(title)}
                >

                    {t(title)}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{t('title')}</DialogTitle>
                    <DialogDescription>
                        {t('description')}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end gap-4 md:gap-1">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            title={t('cancel')}
                        >
                            {t('cancel')}
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            onClick={onConfirm}
                            type='button'
                            variant='default'
                            title={t('accept')}
                        >
                            {t('accept')}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
