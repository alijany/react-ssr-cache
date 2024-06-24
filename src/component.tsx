import React from 'react';


export const SsrCache: React.FC<{ data: any; name: string }> = ({ data, name }) => {
    return (
        <script
            type="application/json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(
                    typeof window === undefined ? data : {},
                ),
            }}
            id={name}
            suppressHydrationWarning
        />
    );
};
