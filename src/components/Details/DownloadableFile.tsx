interface Props {
    href: string;
    fileName: string;
}
const DownloadableFile = (props: Props) => {
    const { href, fileName } = props;
    return (
        <li>
            <a href={href} tabIndex={0} download>
                <span>{fileName}</span>
            </a>
        </li>
    );
};

export default DownloadableFile;
