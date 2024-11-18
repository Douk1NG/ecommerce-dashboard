import { Field } from "@/types/form"

import {
    Text,
    Textarea,
    Currency,
    Tagbox,
    File,
    Switch
} from "./components";

const Components = {
    text: Text,
    textarea: Textarea,
    currency: Currency,
    tagbox: Tagbox,
    file: File,
    switch: Switch,
}

const Component = ({
    type,
    ...props
}: Field) => {

    const Component = Components[type];
    if (!Component) {
        console.warn(`Unknown field type: ${type}`);
        return null;
    }

    return (
        <Component {...props} />
    )
}

export default Component