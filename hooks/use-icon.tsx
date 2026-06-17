import { Icons } from "@/src/shared/types/icon";
import { lazy } from "react";

const cachedIcons = {} as Record<Icons, React.LazyExoticComponent<any>>;

export function useIcon(name: Icons) {
    if (!cachedIcons[name]) {
        cachedIcons[name] = lazy(() =>
            import(`@/public/icons/${name}.svg`)
                .catch(() => {
                    return {
                        default: () => <span title={`Icon ${name} not found`}>⚠️</span>
                    };
                })
        );
    }
    return cachedIcons[name];
}