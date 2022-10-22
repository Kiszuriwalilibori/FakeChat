import Icons from "icons";

interface Props {
    isFavorite?: boolean;
    thumbnail: string;
    name: { first: string; last: string };
    isOnline?: boolean;
}

const Portrait = (props: Props) => {
    const { isFavorite = false, isOnline = false, thumbnail, name } = props;

    return (
        <div className={isOnline ? "image-wrapper online" : "image-wrapper"}>
            {isFavorite && <Icons.Star />}
            <img src={thumbnail} alt={name.last} className="circular--square" />
        </div>
    );
};

export default Portrait;
