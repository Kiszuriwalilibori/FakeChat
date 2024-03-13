import uuid from "react-uuid";

import Typography from "@mui/material/Typography";

import Icons from "assets/icons";
import DownloadableFile from "./File";

import { Files } from "types";

interface Props {
    files: Files;
}
const SharedFiles = (props: Props) => {
    const { files } = props;
    return (
        <div className="Details__files">
            <div className="header">
                <Icons.Files />
                <Typography component="h2" variant="h2_light">
                    Shared files
                </Typography>
            </div>
            <div className="content">
                <ul>
                    {files.map(file => {
                        return <DownloadableFile href={file.href} fileName={file.fileName} key={uuid()} />;
                    })}
                </ul>
            </div>
        </div>
    );
};

export default SharedFiles;
