import { useCallback } from "react";

import Icons from "icons";

import { BasicButton } from "components";
import { useDispatchAction } from "hooks";

const title = "Chat with ";
interface Props {
    userName: { first: string; last: string };
    id: string;
}
const Header = (props: Props) => {
    const { userName, id } = props;
    const { markFavorite } = useDispatchAction();
    const dispatchMarkFavorite = useCallback(() => {
        markFavorite(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (!userName) return null;

    return (
        <div className="Chat__header">
            <div>
                <span>{title}</span>
                <span>{" " + userName.first + " " + userName.last}</span>
            </div>
            <div className="buttons">
                <BasicButton className="form__button">
                    <Icons.Phone />
                </BasicButton>
                <BasicButton className="form__button">
                    <Icons.Camera />
                </BasicButton>
                <BasicButton className="form__button" onClick={dispatchMarkFavorite}>
                    <Icons.Star />
                </BasicButton>
            </div>
        </div>
    );
};

export default Header;

/**
 * todo lepiej przec pick propsy typ
 */
