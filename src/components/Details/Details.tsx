import Slide from "@mui/material/Slide";
import isEmpty from "lodash/isEmpty";

import { connect } from "react-redux";

import SharedFiles from "./Details_Files";
import Header from "./Details_Header";
import Informations from "./Details_Informations";

import { UserDetails, RootStateType, Files } from "types";

import "./_Details.scss";

/**
 * fake files as demo
 */
const foo: Files = [
    {
        href: "/images/myw3schoolsimage.jpg",
        fileName: "annualPlan.doc",
    },
    {
        href: "/images/myw3schoolsimage.jpg",
        fileName: "OffersToCompanies.pdf",
    },
    {
        href: "/images/myw3schoolsimage.jpg",
        fileName: "Calculation.xls",
    },
];

interface Props {
    user: UserDetails;
}

const Details = (props: Props) => {
    const { user } = props;
    const { location, dob, name, phone, picture, social, nat } = user;

    if (isEmpty(user)) return null;
    return (
        <Slide direction="left" timeout={700} in={true} mountOnEnter unmountOnExit>
            <section className="Details">
                <Header name={name} location={location} picture={picture} social={social} />
                <Informations phone={phone} dob={dob} nat={nat} />
                <SharedFiles files={foo} />
            </section>
        </Slide>
    );
};

const mapStateToProps = (state: RootStateType) => ({
    user: state.users.activeUser,
});

export default connect(mapStateToProps, {})(Details);
