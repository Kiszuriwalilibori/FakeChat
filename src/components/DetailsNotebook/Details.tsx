import Slide from "@mui/material/Slide";
import isEmpty from "lodash/isEmpty"; // This import is already optimized

import { connect } from "react-redux";

import { Header, Informations, SharedFiles } from "./components";
import { UserDetails, RootState } from "types";
import { FILES, params, Variant } from "./assets";

import "./styles/_Details.scss";
import useMediaQuery from "@mui/material/useMediaQuery";

interface Props {
    user: UserDetails;
    variant: Variant;
}

export const Details = (props: Props) => {
    const { user, variant } = props;
    const { location, dob, name, phone, picture, social, nat } = user;
    const currentParams = params[variant];

    const matches = useMediaQuery(currentParams.mediaQuery);

    if (!matches) return null;
    if (isEmpty(user)) return null;
    return (
        <Slide direction={currentParams.direction} timeout={700} in={true} mountOnEnter unmountOnExit>
            <section className={currentParams.cls} id={currentParams.id}>
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

export default connect(mapStateToProps, {})(Details);
