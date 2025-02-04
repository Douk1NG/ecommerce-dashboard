import { Icons } from "@/types/icon";
import { ComponentProps, Suspense, useMemo } from "react";
import { useIcon } from "@/hooks/use-icon";

interface LazySvgProps extends ComponentProps<"svg"> {
    name: Icons;
}

const Icon = ({ name, ...props }: LazySvgProps) => {
    const SVG = useMemo(() => useIcon(name), [name]);

    return (
        <Suspense fallback={<span className="icon-loading" />}>
            <SVG {...props} />
        </Suspense>
    );
};

export default Icon;