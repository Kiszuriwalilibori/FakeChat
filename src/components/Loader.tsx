import { memo } from "react";

import Box from "@material-ui/core/Box";
import Progress from "@material-ui/core/CircularProgress";

import { withStyles } from "@material-ui/core/styles";

const Container = withStyles({
    root: {
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignItems: "center",
        background: "transparent",
        paddingTop: "10vh",
        width: "100vw",
        position: "fixed",
    },
})(Box);

const ContainerVerticallyCentered = withStyles({
    root: {
        justifyContent: "center",
    },
})(Container);

export const CircularProgress = withStyles({
    root: {
        color: "#cfb6a8;",
    },
})(Progress);

/**
 * creates memoised spinner that indicates loading state
 * @returns spinner component
 */
const Loader = memo(() => {
    return (
        <ContainerVerticallyCentered>
            <CircularProgress thickness={5} size={100} />
        </ContainerVerticallyCentered>
    );
});

export default Loader;
