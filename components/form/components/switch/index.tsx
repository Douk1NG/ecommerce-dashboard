import { Switch } from '@/components/ui/switch';

export default function Component(props: Record<string, unknown>) {
    return (
        <Switch
            className="flex"
            {...props}
        />
    )
}
