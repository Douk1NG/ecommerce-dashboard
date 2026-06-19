import { ComponentProps } from "react";
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';

export type Icons = IconName;

const Icon = ({ name }: ComponentProps<typeof DynamicIcon>) => {
    return (
        <DynamicIcon name={name} />
    )
};

export default Icon;
