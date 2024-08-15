import { Icons } from "@/lib/types";
import { ComponentProps, Suspense, lazy, useMemo } from "react";

interface LazySvgProps extends ComponentProps<"svg"> {
    name: Icons;
}

const iconCache: { [key: string]: any } = {};

const LazySvgClient = ({ name, ...props }: LazySvgProps) => {
    const Icon = useMemo(() => {
        if (!iconCache[name]) {
            iconCache[name] = lazy(() => import(`@/public/icons/${name}.svg`));
        }
        return iconCache[name];
    }, [name]);

    return (
            <Suspense fallback={<></>}>
                <Icon {...props}/>
            </Suspense>
    );
};

export default LazySvgClient;