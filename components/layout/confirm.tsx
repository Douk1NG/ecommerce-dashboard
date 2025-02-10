import { Button } from "@/components/ui/button"
import Icon from '@/components/icon';
import { useTranslations } from "next-intl";

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

import type { PropTypes } from "@/types/components/dialog";

export default function Index({
    icon,
    onConfirm,
    translations,
    variant = 'outline'
}: PropTypes) {
    const t = useTranslations(translations);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={variant}
                    type='button'
                    title={t('name')}
                >
                    <Icon name={icon} />
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[90vw] md:max-w-md">
                <DialogHeader>
                    <DialogTitle>{t('title')}</DialogTitle>
                    <DialogDescription>
                        {t('description')}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-row justify-center gap-4 md:gap-1">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            title={t('cancel')}
                            className='w-fit'
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
                            className='w-fit'
                        >
                            {t('accept')}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
