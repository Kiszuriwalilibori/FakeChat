import Fade from "@mui/material/Fade";
import CancelIcon from "@mui/icons-material/Cancel";

import { useCallback } from "react";
import { connect } from "react-redux";

import { RootState } from "types";
import { useDispatchAction } from "hooks";

import "./_errorMessage.scss";
import { styleCancelIcon, styleWrapper } from "./style";
import useDebouncedCallback from "hooks/useDebouncedCallback";

const ERROR = "Ojejku, błąd:(";
interface Props {
    errorMessage: string;
}

const ErrorMessage = (props: Props) => {
    const { errorMessage } = props;
    const { clearError } = useDispatchAction();

    const handleCancelClicked = useDebouncedCallback<SVGElement>(clearError);

    return (
        <Fade in={true} timeout={300} style={styleWrapper}>
            <article className="error">
                <CancelIcon onClick={handleCancelClicked} style={styleCancelIcon} />
                <hr></hr>
                <p>{ERROR}</p>
                <p>{errorMessage}</p>
            </article>
        </Fade>
    );
};

const mapStateToProps = (state: RootState) => ({
    errorMessage: state.fetch.errorMessage,
});

export default connect(mapStateToProps, {})(ErrorMessage);
