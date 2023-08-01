interface Props {
    text: string;
    type: string;
}

const Baloon = (props: Props) => {
    const { text, type } = props;

    return <div className={type === "host" ? "baloon baloon-host" : "baloon baloon-user"}>{text}</div>;
};

export default Baloon;
