import React from "react";

export const useDomElement = (parentRef: React.RefObject<HTMLElement>, childElement: HTMLElement) => {
    const parent = parentRef.current;

    React.useLayoutEffect(() => {
        if (!parent) {
            return;
        }

        parent.appendChild(childElement);

        return () => {
            parent.removeChild(childElement);
        };
    }, [parent, childElement])
}
