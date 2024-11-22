import { MultiSelect, type MultiSelectProps } from "@/components/ui/multiselect";

export default function Component(props: Record<string, unknown>) {
    return (
        <MultiSelect
            options={props.options as MultiSelectProps['options']}
            onValueChange={props.onChange as unknown as (value: string[]) => void}
            defaultValue={props.value as string[]}
            placeholder={props.placeholder as string}
            variant="inverted"
            maxCount={3}
            creatable={props.creatable as boolean}
        />
    )
}
