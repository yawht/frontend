import React from "react";

export const useRenewedBoolean = (ms: number) => {
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        if (value === 0) {
            return;
        }

        const timeout = setTimeout(() => setValue(0), ms);

        return () => clearTimeout(timeout);
    }, [ms, value]);

    const renew = React.useCallback(() => setValue(x => x + 1), []);

    return [Boolean(value), renew] as const;
} 
