import Box from "@mui/material/Box";

import { memo } from "react";

import { CircularProgress, styleLoaderWrapper } from "./style";

/**
 * creates memoised spinner that indicates loading state
 * @returns spinner component
 */
const Loader = memo(() => {
    return (
        <Box id="wrapper" sx={styleLoaderWrapper}>
            <CircularProgress thickness={5} size={100} />
        </Box>
    );
});

export default Loader;
