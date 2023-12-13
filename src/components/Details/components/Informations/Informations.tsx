import Moment from "react-moment";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { pick } from "lodash";
import { useMemo } from "react";

import Icons from "assets/icons";

import { countries, langs } from "assets/countries";
import { UserDetails } from "types";
import { InformationsItem } from "./Information";
import { InformationsContainer } from "./Container";

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
                <Typography component="h2" variant="h2_light">
                    Informations
                </Typography>
            </div>

            <InformationsContainer divider={<Divider orientation="vertical" flexItem />}>
                <InformationsItem>
                    <Typography variant="text_light_small">Tel:</Typography>
                    <Typography variant="text_light_small">{phone}</Typography>
                </InformationsItem>
                <InformationsItem>
                    <Typography variant="text_light_small">Date of Birth:</Typography>
                    <Typography variant="text_light_small">
                        <Moment format="MMMM DD, YYYY">{dob}</Moment>
                    </Typography>
                </InformationsItem>
                <InformationsItem>
                    <Typography variant="text_light_small">Language:</Typography>
                    <Typography variant="text_light_small">{userLanguages}</Typography>
                </InformationsItem>
            </InformationsContainer>
        </div>
    );
};

export default Informations;
