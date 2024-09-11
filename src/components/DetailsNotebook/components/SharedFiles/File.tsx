import { Typography } from "@mui/material";
import { LoadableFile } from "./SharedFiles.style";

interface Props {
    href: string;
    fileName: string;
}
const File = (props: Props) => {
    const { href, fileName } = props;
    return (
        <LoadableFile>
            <a href={href} tabIndex={0} download>
                <Typography variant="fileName">{fileName}</Typography>
            </a>
        </LoadableFile>
    );
};

export default File;
