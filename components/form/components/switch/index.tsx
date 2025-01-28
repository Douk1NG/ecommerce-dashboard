import { Switch } from '@/components/ui/switch';
import type { SwitchField } from '@/types/form';

export default function Component(props: SwitchField) {
    return (
        <Switch
            name={props.name}
            className="flex"
            disabled={props.readOnly}
            defaultChecked={props.value as boolean}
        />
    )
}
