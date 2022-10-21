import Moment from "react-moment";

import Icons from "icons";

import { UserDetails } from "types/types";

const Informations = (props: Pick<UserDetails, "phone" | "dob">) => {
    const { phone, dob } = props;

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
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default Informations;
