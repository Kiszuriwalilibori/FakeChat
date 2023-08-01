import Fade from "@mui/material/Fade";
import CancelIcon from "@mui/icons-material/Cancel";

import { useCallback } from "react";
import { connect } from "react-redux";

import { RootStateType } from "types";
import { useDispatchAction } from "hooks";

import "./_errorMessage.scss";

const cancel = {
    cursor: "pointer",
};
const center = {
    margin: "0 auto",
};

const generalWarning = "Ojejku, błąd:(";
interface Props {
    errorMessage: string;
}

const ProblemMessage = (props: Props) => {
    const { errorMessage } = props;
    const { clearError } = useDispatchAction();
    const dispatchHideErrorMessage = useCallback(() => {
        clearError();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fade in={true} timeout={300} style={center}>
            <article className="error">
                <CancelIcon onClick={dispatchHideErrorMessage} style={cancel} />
                <hr></hr>
                <p>{generalWarning}</p>
                <p>{errorMessage}</p>
            </article>
        </Fade>
    );
};

const mapStateToProps = (state: RootStateType) => ({
    errorMessage: state.fetch.errorMessage,
});

export default connect(mapStateToProps, {})(ProblemMessage);
