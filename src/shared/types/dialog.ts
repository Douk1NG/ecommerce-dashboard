import type { ButtonProps } from "@/components/ui/button";
import type { Icons } from "@/src/shared/types/icon";

export type PropTypes = {
    icon: Icons;
    onConfirm: () => void;
    variant?: ButtonProps['variant'];
    translations: {
        title: string;
        description: string;
        name: string;
        cancel: string;
        accept: string;
    }
}
