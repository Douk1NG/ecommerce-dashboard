import { MultiSelect } from "@/components/ui/multiselect";
import { MultiselectField } from "@/types/form";

export default function Component(props: MultiselectField) {
    return (
        <MultiSelect
            name={props.name}
            options={props.options}
            defaultValue={props.value as []}
            placeholder={props.placeholder}
            maxDisplayed={3}
            creatable={props.creatable}
        />
    )
}
