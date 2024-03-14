import uuid from "react-uuid";

import Typography from "@mui/material/Typography";

import Icons from "assets/icons";
import File from "./File";

import { Files } from "types";
import { FileList, SharedFilesHeader, SharedFilesWrapper } from "./SharedFiles.style";

interface Props {
    files: Files;
}
const SharedFiles = (props: Props) => {
    const { files } = props;
    return (
        <SharedFilesWrapper id="Shared Files Wrapper">
            <SharedFilesHeader id="Shared Files Header" direction="row">
                <Icons.Files />
                <Typography component="h2" variant="h2_light">
                    Shared files
                </Typography>
            </SharedFilesHeader>
            <div className="content">
                <FileList>
                    {files.map(file => {
                        return <File href={file.href} fileName={file.fileName} key={uuid()} />;
                    })}
                </FileList>
            </div>
        </SharedFilesWrapper>
    );
};

export default SharedFiles;
