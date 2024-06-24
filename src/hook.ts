import { useMemo } from 'react';

export const useSsrCache = (name: string) => {
    const dataObject = useMemo(() => {
        if (typeof window === undefined) {
            return undefined;
        }
        const scriptElement = document.getElementById(name);
        if (scriptElement) {
            try {
                const jsonData = scriptElement.textContent;
                if (jsonData) {
                    const parsedData = JSON.parse(jsonData);
                    return parsedData;
                }
                return undefined;
            } catch (error) {
                console.error('Failed to parse JSON data:', error);
                return undefined;
            }
        }
    }, [name]);

    return dataObject;
};
