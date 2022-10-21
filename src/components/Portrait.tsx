import Icons from "icons";

interface Props {
    isFavorite?: boolean;
    thumbnail: string;
    name: { first: string; last: string };
    online?: boolean;
}

const Portrait = (props: Props) => {
    const { isFavorite = false, thumbnail, online = false, name } = props;

    const cls = online
        ? "image-wrapper online"
        : Boolean(Math.round(Math.random()))
        ? "image-wrapper online"
        : "image-wrapper";
    return (
        <div className={cls}>
            {isFavorite && <Icons.Star />}
            <img src={thumbnail} alt={name.last} className="circular--square" />
        </div>
    );
};

export default Portrait;
