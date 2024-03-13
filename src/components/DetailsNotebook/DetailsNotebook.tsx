import Slide from "@mui/material/Slide";
import isEmpty from "lodash/isEmpty";

import { connect } from "react-redux";

import { Header, Informations, SharedFiles } from "./components";
import { UserDetails, RootState, Files } from "types";

import "./styles/_Details.scss";
import useMediaQuery from "@mui/material/useMediaQuery";

/**
 * fake files as demo
 */
const FILES: Files = [
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

const DetailsNotebok = (props: Props) => {
    const { user } = props;
    const { location, dob, name, phone, picture, social, nat } = user;
    const matches = useMediaQuery("(min-width: 768px ) and (max-width: 1105px");

    if (!matches) return null;
    if (isEmpty(user)) return null;

    return (
        <Slide direction="down" timeout={700} in={true} mountOnEnter unmountOnExit>
            <section className="Details-notebook" id="DetailsNotebook">
                <Header name={name} location={location} picture={picture} social={social} />
                <Informations phone={phone} dob={dob} nat={nat} />
                <SharedFiles files={FILES} />
            </section>
        </Slide>
    );
};

const mapStateToProps = (state: RootState) => ({
    user: state.users.activeUser,
});

export default connect(mapStateToProps, {})(DetailsNotebok);
