import { useMemo } from 'react';

export const useSsrCache = <T = any>(name: string, { isWebPlatform } = { isWebPlatform: true }): T | undefined => {
    const dataObject = useMemo(() => {
        if (typeof window === 'undefined' || !isWebPlatform) {
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
    }, [name, isWebPlatform]);

    return dataObject;
};