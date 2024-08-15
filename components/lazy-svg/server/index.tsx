import { ComponentProps, Suspense } from "react";

import dynamic from "next/dynamic";

interface LazySvgProps extends ComponentProps<"svg"> {
    name: string;
}

const LazySvgServer = async ({ name, ...props }: LazySvgProps) => {
    const Icon = dynamic(() => import(`@/public/icons/${name}.svg`));
    return (
        <Suspense>
            <Icon {...props} />
        </Suspense>
    );
};

export default LazySvgServer;
