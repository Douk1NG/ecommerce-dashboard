type PropTypes = {
    delete?: boolean;
    edit?: boolean;
    children: React.ReactNode
    isEditing?: boolean;
    isNew: boolean;
    title: string;
    permissions?: {
        edit?: boolean;
        delete?: boolean;
    };
    onDelete: () => Promise<any>;
    onEditModeChange?: (isEditing: boolean) => void;
};

export default PropTypes;
