import Text from "./components/text";
import Textarea from "./components/textarea";
import Currency from "./components/currency";
import MultiSelect from "./components/multiselect";
import File from "./components/file";
import Switch from "./components/switch";
import Tagbox from "./components/tagbox";

import type { Field } from "@/types/form";

const Components = {
    text: Text,
    textarea: Textarea,
    currency: Currency,
    multiselect: MultiSelect,
    file: File,
    switch: Switch,
    tagbox: Tagbox
};

const Index = <T extends Field>(props: T) => {
    const Component = Components[props.type] as (props: T) => JSX.Element;

    if (!Component) {
        return (
            null
        );
    }

    return (
        <Component
            {...props}
        />
    )
}

export default Index