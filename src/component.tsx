import React from 'react';

interface SsrCacheProps<T> {
    data: T;
    name: string;
    isWebPlatform?: boolean
}

export const SsrCache = <T = any>({ data, name, isWebPlatform }: SsrCacheProps<T>) => {
    if (isWebPlatform === false) return null
    return (
        <script
            type="application/json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(typeof window === 'undefined' ? data : null),
            }}
            id={name}
            suppressHydrationWarning
        />
    );
};