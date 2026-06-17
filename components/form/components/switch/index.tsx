import { Switch } from '@/components/ui/switch';
import type { SwitchField } from '@/src/shared/types/form';

export default function Component(props: SwitchField) {
    const value = props.defaultValue ?? props.value;
    return (
        <Switch
            id={props.name}
            name={props.name}
            className="flex"
            disabled={props.readOnly}
            defaultChecked={value as boolean}
        />
    )
}
