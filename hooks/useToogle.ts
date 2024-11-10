import { useCallback, useState } from 'react';

interface UseToggleReturn {
    isVisible: boolean;
    toggle: () => void;
    setIsVisible: (value: boolean) => void;
}

const useToggle = (initialState = false): UseToggleReturn => {
    const [isVisible, setIsVisible] = useState<boolean>(initialState);

    const toggle = useCallback(() => {
        setIsVisible(prev => !prev);
    }, []);

    return {
        isVisible,
        toggle,
        setIsVisible: setIsVisible
    };
};

export default useToggle;