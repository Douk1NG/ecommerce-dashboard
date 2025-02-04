import Text from "./components/text";
import Textarea from "./components/textarea";
import Currency from "./components/currency";
import MultiSelect from "./components/multiselect";
import Switch from "./components/switch";
import Tagbox from "./components/tagbox";
import Select from "./components/select";
import ImageUploader from "./components/image-uploader";
import Group from "./components/group";
import { Label } from "@/components/ui/label";

import type { Field } from "@/types/form";

const Components = {
    text: Text,
    textarea: Textarea,
    currency: Currency,
    multiselect: MultiSelect,
    switch: Switch,
    tagbox: Tagbox,
    select: Select,
    image: ImageUploader,
    group: Group
};

const Index = <T extends Field>(props: T) => {
    const Component = Components[props.type] as (props: T) => JSX.Element;

    if (!Component) {
        return (
            null
        );
    }

    return (
        <div className="w-full">
            <Label htmlFor={props.name}>{props.label}</Label>
            <Component {...props} />
            <p className='text-sm text-muted-foreground'>{props.description}</p>
        </div>
    )

}

export default Index