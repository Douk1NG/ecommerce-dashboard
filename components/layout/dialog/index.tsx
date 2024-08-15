import { translations } from "@/i18n";
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

type PropTypes = {
    onConfirm: () => void;
};

export default function Index({ onConfirm }: PropTypes) {
    const t = useTranslations(translations.dialog);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">{t('cancel')}</Button>
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
                        <Button type="button" variant="secondary">
                            {t('cancel')}
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button onClick={onConfirm}>
                            {t('accept')}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
