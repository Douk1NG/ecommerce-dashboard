import { useTranslations } from "next-intl";
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
import { cleanSplit } from "@/lib/utils";
import { usePathname } from "@/i18n/routing";
import { useRouter } from "next/navigation";

export default function Index() {
    const t = useTranslations(translations.dialog);
    const pathname = usePathname();
    const router = useRouter();
    const title = 'close'

    const base = cleanSplit({
        value: pathname,
        criteria: '/'
    }).slice(0, -1).join('/')

    const onConfirm = () => {
        router.push(`/${base}`)
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
