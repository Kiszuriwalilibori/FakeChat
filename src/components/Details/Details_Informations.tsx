import Moment from "react-moment";
import { pick } from "lodash";

import Icons from "icons";

import { UserDetails } from "types/types";

import countries from "countries/countries.json";
import langs from "countries/languages.json";
import { useMemo } from "react";

const Informations = (props: Pick<UserDetails, "phone" | "dob" | "nat">) => {
    const { phone, dob, nat } = props;

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

    return (
        <div className="Details__informations">
            <div className="header">
                <Icons.Information />
                <h2>Informations</h2>
            </div>
            <div className="content">
                <div>
                    <span>Tel:</span>
                    <span>{phone}</span>
                </div>
                <div>
                    <span>Date of Birth:</span>

                    <Moment format="MMMM DD, YYYY">{dob}</Moment>
                </div>
                <div>
                    <span>Language:</span>
                    <span>{userLanguages}</span>
                </div>
            </div>
        </div>
    );
};

export default Informations;
