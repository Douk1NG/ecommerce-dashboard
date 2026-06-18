import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Icon from '@/components/layout/icon';

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

import type { PropTypes } from "@/src/shared/types/dialog";

export default function Index({
    icon,
    onConfirm,
    translations,
    variant = 'outline'
}: PropTypes) {
    const t = useTranslations();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={variant}
                    title={t(translations.name)}
                    className="cursor-pointer"
                >
                    <Icon name={icon} className='h-5 w-5' />
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[90vw] md:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {t(translations.title)}
                    </DialogTitle>
                    <DialogDescription>
                        {t(translations.description)}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-row justify-center gap-4 md:gap-1">
                    <DialogClose asChild>
                        <Button
                            variant="secondary"
                            className='w-fit cursor-pointer'
                        >
                            {t(translations.cancel)}
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            variant="default"
                            onClick={onConfirm}
                            className='w-fit cursor-pointer'
                        >
                            {t(translations.accept)}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
