import Fade from "@mui/material/Fade";
import CancelIcon from "@mui/icons-material/Cancel";

import { useCallback } from "react";
import { connect } from "react-redux";

import { RootState } from "types";
import { useDispatchAction } from "hooks";

import "./_errorMessage.scss";
import useDebouncedCallback from "hooks/useDebouncedCallback";

const CANCEL = {
    cursor: "pointer",
};
const CENTER = {
    margin: "0 auto",
};

const ERROR_MESSAGE = "Ojejku, błąd:(";
interface Props {
    errorMessage: string;
}

const ErrorMessage = (props: Props) => {
    const { errorMessage } = props;
    const { clearError } = useDispatchAction();

    const handleCancelClicked = useDebouncedCallback(clearError);

    return (
        <Fade in={true} timeout={300} style={CENTER}>
            <article className="error">
                <CancelIcon onClick={handleCancelClicked} style={CANCEL} />
                <hr></hr>
                <p>{ERROR_MESSAGE}</p>
                <p>{errorMessage}</p>
            </article>
        </Fade>
    );
};

const mapStateToProps = (state: RootState) => ({
    errorMessage: state.fetch.errorMessage,
});

export default connect(mapStateToProps, {})(ErrorMessage);
