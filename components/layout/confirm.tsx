import IntlButton from "@/components/intl/ui/Button";
import IntlText from "@/components/intl/ui/Text";
import Icon from '@/components/icon';

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
    translations: {
        TITLE,
        DESCRIPTION,
        NAME,
        CANCEL,
        ACCEPT
    },
    variant = 'outline'
}: PropTypes) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <IntlButton
                    variant={variant}
                    title={NAME}
                >
                    <Icon name={icon} className='h-5 w-5' />
                </IntlButton>
            </DialogTrigger>
            <DialogContent className="w-[90vw] md:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        <IntlText title={TITLE} />
                    </DialogTitle>
                    <DialogDescription>
                        <IntlText title={DESCRIPTION} />
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-row justify-center gap-4 md:gap-1">
                    <DialogClose asChild>
                        <IntlButton
                            variant="secondary"
                            title={CANCEL}
                            className='w-fit'
                            text
                        />
                    </DialogClose>
                    <DialogClose asChild>
                        <IntlButton
                            variant="default"
                            onClick={onConfirm}
                            title={ACCEPT}
                            className='w-fit'
                            text
                        />
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
