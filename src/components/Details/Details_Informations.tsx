import Moment from "react-moment";
import { pick } from "lodash";

import Icons from "icons";

import { UserDetails } from "types/types";

import countries from "countries/countries.json";

const Informations = (props: Pick<UserDetails, "phone" | "dob" | "nat">) => {
    const { phone, dob, nat } = props;

    const languages = Object.values(pick(countries, [nat]))[0].languages.join(" ");

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
                    <span>{languages}</span>
                </div>
            </div>
        </div>
    );
};

export default Informations;
