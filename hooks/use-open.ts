
import { useCallback, useState } from 'react';

const useOpen = (defaultValue = false) => {
    const [value, setValue] = useState<boolean>(defaultValue);

    const onOpen = useCallback(() => {
        setValue(true);
    }, []);

    const onClose = useCallback(() => {
        setValue(false);
    }, []);

    return {
        value,
        onOpen,
        onClose
    };
};

export default useOpen;
