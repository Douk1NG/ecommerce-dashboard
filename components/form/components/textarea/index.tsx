import { Textarea } from '@/components/ui/textarea';
import type { TextAreaField } from '@/src/shared/types/form';

export default function Component(props: TextAreaField) {
    return (
        <Textarea
            placeholder={props.placeholder}
            defaultValue={props.value as string}
            id={props.name}
            name={props.name}
            readOnly={props.readOnly}
        />
    )
}
