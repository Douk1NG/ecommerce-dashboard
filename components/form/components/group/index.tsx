import Field from "@/components/form/field";
import { useCallback, useRef, useState } from "react";
import { useFieldInheritance } from "@/hooks/use-field-inheritance";
import Icon from "@/components/icon";
import { Button } from "@/components/ui/button";
import { getUniqueByKey } from "@/lib/utils";

import type { Option } from "@/types/select";
import type { GroupField } from "@/types/form";
import { useInheritanceContext } from "@/context/InheritanceProvider";

type Group = {
    id?: number;
    filters?: string[];
    price?: number;
    index?: number;
}

export default function Component({
    name,
    readOnly,
    inheritFrom,
    value: defaultValue = [{}]
}: GroupField) {
    const [groups, setGroups] = useState<Group[]>(defaultValue as Group[]);
    const [options, setOptions] = useState<Option[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const inheritanceMethod = useCallback((value: unknown) => {
        if (!Array.isArray(value)) return;

        const uniqueFilters = getUniqueByKey(value as Option[], 'value');
        const hasFilterOptionsChanged = JSON.stringify(options) !== JSON.stringify(uniqueFilters);

        if (hasFilterOptionsChanged) {
            setOptions(uniqueFilters)
        }

    }, [options])

    useFieldInheritance(inheritFrom, inheritanceMethod, readOnly)

    const addGroup = () => {
        setGroups(prevGroups => [...prevGroups, {}]);
    };

    const removeGroup = (indexToRemove: number) => {
        setGroups(prevGroups => prevGroups.filter((_, index) => index !== indexToRemove));
    };

    const handleChange = (value: unknown, index: number, id: unknown) => {
        const updatedGroups = [...groups];
        const field = Array.isArray(value) ? 'filters' : 'price';

        updatedGroups[index] = {
            ...updatedGroups[index],
            id: id as number,
            [field]: value
        };

        setGroups(updatedGroups);
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
            <input
                ref={inputRef}
                type="hidden"
                name={name}
                value={JSON.stringify(groups)}
            />
            {groups.map((group, index) => (
                <div
                    key={index}
                    className="flex items-end gap-2 border p-4 rounded relative"
                >
                    <div className="flex-1 flex gap-2">
                        <Field
                            label="Filtros"
                            id={`${name}_filters_${index}`}
                            options={options}
                            type="multiselect"
                            value={group.filters}
                            onChange={(value: unknown) => handleChange(value, index, group.id)}
                        />
                        <Field
                            label="Precio"
                            id={`${name}_price_${index}`}
                            type="currency"
                            value={group.price}
                            onChange={(value: unknown) => handleChange(value, index, group.id)}
                        />
                    </div>
                    {(!readOnly && groups.length > 1) && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeGroup(index)}
                            className="absolute top-0 right-0 rounded-full hover:text-red-800 hover:bg-red-50"
                            title="Eliminar grupo"
                        >
                            <Icon name="trash" />
                        </Button>
                    )}
                </div>
            ))}
        </div>
    );
}