import Moment from "react-moment";
import Typography from "@mui/material/Typography";

import Icons from "assets/icons";

import { UserDetails } from "types";
import { InformationsItem, InformationsContainer, InformationsHeader, InformationsWrapper } from "./Informations.style";
import { useGetUserLanguages } from "hooks";

const Informations = (props: Pick<UserDetails, "phone" | "dob" | "nat">) => {
    const { phone, dob, nat } = props;
    const userLanguages = useGetUserLanguages(nat);

    return (
        <InformationsWrapper id="Informations Wrapper">
            <InformationsHeader direction="row" id="Informations Header">
                <Icons.Information className="details_header_icon" />
                <Typography component="h2" variant="h2_light">
                    Informations
                </Typography>
            </InformationsHeader>

            <InformationsContainer id="Informations Container">
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
        </InformationsWrapper>
    );
};

export default Informations;
