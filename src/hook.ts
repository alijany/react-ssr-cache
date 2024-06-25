import { useMemo } from 'react';

export const useSsrCache = <T extends any>(name: string): T | undefined => {
    const dataObject = useMemo(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }
        const scriptElement = document.getElementById(name);
        if (!scriptElement)
            return undefined;
        try {
            const jsonData = scriptElement.textContent;
            if (jsonData) {
                const parsedData: T = JSON.parse(jsonData);
                return parsedData;
            }
            return undefined;
        } catch (error) {
            console.error('Failed to parse JSON data:', error);
            return undefined;
        }
    }, [name]);

    return dataObject;
};