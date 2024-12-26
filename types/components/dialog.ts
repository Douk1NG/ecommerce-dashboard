import { ButtonProps } from "@/components/ui/button";
import { Icons } from "../icon";

export type PropTypes = {
    translations: string;
    icon: Icons;
    onConfirm: () => void;
    variant?: ButtonProps['variant'];
}
