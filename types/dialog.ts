import type { ButtonProps } from "@/components/ui/button";
import type { Icons } from "@/types/icon";

export type PropTypes = {
    translations: Record<string, string>;
    icon: Icons;
    onConfirm: () => void;
    variant?: ButtonProps['variant'];
}
