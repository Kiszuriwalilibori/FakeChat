import { pick } from "lodash";
import { useMemo } from "react";
import { countries, langs } from "assets/countries";

export const useGetUserLanguages = (nat: string) => {
    const pickedCodes = Object.values(pick(countries, [nat]))[0].languages;

    const codesWithLanguages = useMemo(() => {
        return Object.assign(
            {},
            ...langs.map(item => {
                const code = item.alpha2;
                const value = item.English;
                const newItem = { [code]: value };
                return newItem;
            })
        );
    }, []);

    const userLanguages = pickedCodes
        .map(code => {
            return codesWithLanguages[code] ? codesWithLanguages[code] : code;
        })
        .join(" ");

    return userLanguages;
};

export default useGetUserLanguages;
