import { Icons } from "@/types/icon";
import { ComponentProps, Suspense } from "react";
import { useIcon } from "@/hooks/use-icon";

interface LazySvgProps extends ComponentProps<"svg"> {
    name: Icons;
}

const Icon = ({ name, ...props }: LazySvgProps) => {
    const SVG = useIcon(name);

    return (
        <Suspense fallback={<span className="icon-loading" />}>
            <span><SVG {...props} /></span>
        </Suspense>
    );
};

export default Icon;