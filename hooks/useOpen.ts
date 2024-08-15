
import { useCallback, useState } from 'react';

const useOpen = (defaultValue = false) => {
    const [value, setValue] = useState<boolean>(defaultValue);

    const onOpen = useCallback(() => {
        setValue(true);
    }, []);

    const onClose = useCallback(() => {
        setValue(false);
    }, []);

    const onToggle = useCallback(() => {
        setValue((previous) => !previous);
    }, []);

    return {
        value,
        onOpen,
        onClose,
        onToggle
    };
};

export default useOpen;
