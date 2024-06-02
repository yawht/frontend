import React from 'react';

export function useInstance<I>(ctor: () => I): I;
export function useInstance<I, P extends unknown[]>(ctor: (...args: P) => I, ...args: P): I;
export function useInstance<I, P extends unknown[]>(ctor: (...args: P) => I, ...args: P): I {
    const instanceRef = React.useRef<I | undefined>();

    if (!instanceRef.current) {
        instanceRef.current = ctor(...args);
    }

    return instanceRef.current;
};
