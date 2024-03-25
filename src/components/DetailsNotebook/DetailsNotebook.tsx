import Slide from "@mui/material/Slide";
import useMediaQuery from "@mui/material/useMediaQuery";
import isEmpty from "lodash/isEmpty";

import { connect } from "react-redux";

import { Header, Informations, SharedFiles } from "./components";
import { UserDetails, RootState } from "types";
import { FILES, NOTEBOOK_MEDIA_QUERY } from "./assets";

import "./styles/_Details.scss";

interface Props {
    user: UserDetails;
}

const DetailsNotebok = (props: Props) => {
    const { user } = props;
    const { location, dob, name, phone, picture, social, nat } = user;
    const matches = useMediaQuery(NOTEBOOK_MEDIA_QUERY);

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
