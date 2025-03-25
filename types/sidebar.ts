type PropTypes = {
    title: string;
    children: React.ReactNode
    onDelete: () => Promise<any>;
    isNew: boolean;
    translations: string;
    onEditModeChange?: (isEditing: boolean) => void;
    isEditing?: boolean;
    permissions?: {
        edit?: boolean;
        delete?: boolean;
    };
};

export default PropTypes;
