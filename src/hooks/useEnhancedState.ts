import { useCallback, useMemo, useState } from "react";

function areDeeplyEqual(x: any, y: any): boolean {
    if (x === y) return true;

    if (Array.isArray(x) && Array.isArray(y)) {
        if (x.length !== y.length) return false;

        return x.every((elem, index) => {
            return areDeeplyEqual(elem, y[index]);
        });
    }

    if (typeof x === "object" && typeof y === "object" && x !== null && y !== null) {
        if (Array.isArray(x) || Array.isArray(y)) return false;

        const keys1 = Object.keys(x);
        const keys2 = Object.keys(y);

        if (keys1.length !== keys2.length || !keys1.every(key => keys2.includes(key))) return false;

        for (let key in x) {
            console.log(x[key], y[key]);
            let isEqual = areDeeplyEqual(x[key], y[key]);
            if (!isEqual) {
                return false;
            }
        }

        return true;
    }

    return false;
}
function useEnhancedState<T>(initialValue: T) {
    const [value, setValue] = useState(initialValue);

    const resetState = useCallback(() => {
        setValue(initialValue);
    }, [initialValue]);

    const setState = useCallback((newValue: T) => {
        setValue(newValue);
    }, []);

    const isStateSet = useMemo(() => {
        return areDeeplyEqual(value, initialValue);
    }, [value, initialValue]);

    return [value, setState, resetState, isStateSet] as const;
}

export default useEnhancedState;
