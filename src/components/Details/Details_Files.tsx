import uuid from "react-uuid";

import Icons from "icons";
import DownloadableFile from "./DownloadableFile";

import { Files } from "types/types";
import Typography from "@mui/material/Typography";

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
