import { Typography } from "@mui/material";

interface Props {
    href: string;
    fileName: string;
}
const DownloadableFile = (props: Props) => {
    const { href, fileName } = props;
    return (
        <li>
            <a href={href} tabIndex={0} download>
                <Typography variant="text_light_underlined">{fileName}</Typography>
            </a>
        </li>
    );
};

export default DownloadableFile;
