import { useCallback } from "react";

import Icons from "icons";

import { BasicButton } from "components";
import { useDispatchAction } from "hooks";
import { UserDetails } from "types/types";

const title = "Chat with ";

const Header = (props: Pick<UserDetails, "id" | "name">) => {
    const { name, id } = props;
    const { markFavorite } = useDispatchAction();

    const dispatchMarkFavorite = useCallback(() => {
        markFavorite(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (!name) return null;

    return (
        <div className="Chat__header" id="Chat_Header">
            <div>
                <span>{title}</span>
                <span>{" " + name.first + " " + name.last}</span>
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
