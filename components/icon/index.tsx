import { Icons } from "@/lib/types/icon";

// prettier-ignore
import {
    ComponentProps,
    Suspense,
    lazy,
    useMemo
} from "react";

interface LazySvgProps extends ComponentProps<"svg"> {
    name: Icons;
}

const cachedIcons: Record<Icons, React.LazyExoticComponent<any>> = {} as Record<Icons, React.LazyExoticComponent<any>>;

const loadIcon = (name: Icons) => {
    if (!cachedIcons[name]) {
        cachedIcons[name] = lazy(() =>
            import(`@/public/icons/${name}.svg`)
                .catch(() => {
                    console.error(`Failed to load icon: ${name}`);
                    return {
                        default: () => <span>⚠️</span>
                    };
                })
        );
    }
    return cachedIcons[name];
};

const Icon = ({ name, ...props }: LazySvgProps) => {
    const SVG = useMemo(() => loadIcon(name), [name]);

    return (
        <Suspense fallback={<span className="icon-loading" />}>
            <SVG {...props} />
        </Suspense>
    );
};


export default Icon;