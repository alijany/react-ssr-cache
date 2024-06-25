import React from 'react';

interface SsrCacheProps<T> {
    data: T;
    name: string;
}

export const SsrCache = <T = any>({ data, name }: SsrCacheProps<T>) => {
    return (
        <script
            type="application/json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(typeof window === 'undefined' ? data : {}),
            }}
            id={name}
            suppressHydrationWarning
        />
    );
};