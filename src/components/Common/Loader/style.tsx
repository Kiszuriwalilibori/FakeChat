import Progress from "@mui/material/CircularProgress";
import withStyles from "@mui/styles/withStyles";

export const styleLoaderWrapper = {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    width: "100vw",
    position: "fixed",
    top: "0",
    left: "0",
};

export const CircularProgress = withStyles({
    root: {
        color: "#cfb6a8;",
    },
})(Progress);
