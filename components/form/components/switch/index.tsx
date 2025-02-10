import { Switch } from '@/components/ui/switch';
import type { SwitchField } from '@/types/form';

export default function Component(props: SwitchField) {
    const value = props.defaultValue ?? props.value;
    return (
        <Switch
            name={props.name}
            className="flex"
            disabled={props.readOnly}
            defaultChecked={value as boolean}
        />
    )
}
