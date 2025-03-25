import IntlButton from "@/components/intl/Button";
import IntlText from "@/components/intl/Text";
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

import type { PropTypes } from "@/types/dialog";

export default function Index({
    icon,
    onConfirm,
    translations,
    variant = 'outline'
}: PropTypes) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <IntlButton
                    variant={variant}
                    title={translations.name}
                    tooltip
                >
                    <Icon name={icon} className='h-5 w-5' />
                </IntlButton>
            </DialogTrigger>
            <DialogContent className="w-[90vw] md:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        <IntlText value={translations.title} />
                    </DialogTitle>
                    <DialogDescription>
                        <IntlText value={translations.description} />
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-row justify-center gap-4 md:gap-1">
                    <DialogClose asChild>
                        <IntlButton
                            variant="secondary"
                            title={translations.cancel}
                            className='w-fit'
                            text
                        />
                    </DialogClose>
                    <DialogClose asChild>
                        <IntlButton
                            variant="default"
                            onClick={onConfirm}
                            title={translations.accept}
                            className='w-fit'
                            text
                        />
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
