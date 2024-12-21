import Text from "./components/text";
import Textarea from "./components/textarea";
import Currency from "./components/currency";
import MultiSelect from "./components/multiselect";
import File from "./components/file";
import Switch from "./components/switch";

const Components = {
    text: Text,
    textarea: Textarea,
    currency: Currency,
    multiselect: MultiSelect,
    file: File,
    switch: Switch,
}

const Component = (props: Record<string, unknown>) => {

    const Component = Components[props.type as keyof typeof Components];

    if (!Component) {
        return (
            null
        );
    }

    return (
        <Component
            {...props as unknown as Record<string, unknown>}
        />
    )
}

export default Component