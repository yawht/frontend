import React from "react";

export function useStrictContext<T>(context: React.Context<T | null>) {
    const value = React.useContext(context);

    if (value === null) {
        throw new Error(`useStrictContext(${context.displayName}): context value is null`);
    }

    return value;
}
