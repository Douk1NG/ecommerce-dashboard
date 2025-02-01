import type { GroupField } from "@/types/form";
import Field from "@/components/form/field";
import { useState } from "react";
import Icon from "@/components/icon";
import { Button } from "@/components/ui/button";

type Group = {
    [key: string]: unknown;
}

export default function Component({
    name,
    fields,
    value = [] as Group[],
    readOnly

}: GroupField) {
    const [groups, setGroups] = useState<Group[]>(Array.isArray(value) && value.length > 0 ? value as Group[] : [{}]);

    const addGroup = () => {
        setGroups([...groups, {}]);
    };

    const removeGroup = (index: number) => {
        setGroups(groups.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col gap-4">
            {!readOnly && (
                <Button
                    type="button"
                    variant="secondary"
                    size="default"
                    onClick={addGroup}
                    className="hover:text-green-800 hover:bg-green-50 w-fit self-end"
                >


                    Agregar
                </Button>
            )}
            {groups.map((groupValue, index) => (
                <div key={index} className="flex items-end gap-2 border p-4 rounded relative">
                    <div className="flex-1 flex gap-2">
                        {fields.map((field) => (
                            <Field
                                key={field.name}
                                {...field}
                                name={`${name}[${index}][${field.name}]`}
                                value={groupValue[field.name] }
                            />
                        ))}
                    </div>
                    {!readOnly && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeGroup(index)}
                            className="absolute top-0 right-0 rounded-full hover:text-red-800 hover:bg-red-50"
                        >
                            <Icon name="trash" />
                        </Button>

                    )}
                </div>
            ))}
        </div>

    );

}