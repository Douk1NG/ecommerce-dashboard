import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import type { SelectField } from "@/types/form"

const Component = (props: SelectField) => {

    return (
        <Select
            defaultValue={props.value as string}
            name={props.name}
        >
            <SelectTrigger>
                <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent>
                {props.options?.map((option) => (
                    <SelectItem
                        key={option.id}
                        value={option.id.toString()}
                    >{option.value}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default Component