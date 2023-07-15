import { useCallback } from "react";

import Icons from "icons";

import { BasicButton } from "components";
import { useDispatchAction } from "hooks";
import { UserDetails } from "types/types";
import Typography from "@mui/material/Typography";

const title = "Chat with ";
const emptyTitle = "Chat with...";

const Header = (props: Pick<UserDetails, "id" | "name">) => {
    const { name, id } = props;
    const { toggleFavorite } = useDispatchAction();

    const dispatchMarkFavorite = useCallback(() => {
        toggleFavorite(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const active = Boolean(name && name.last);
    return (
        <div className="Chat__header" id="Chat_Header">
            <div>
                <span>{active ? title : emptyTitle}</span>
                {active && <Typography variant="text_blue_underlined">{` ${name.first} ${name.last}`}</Typography>}
            </div>
            <div className="buttons">
                <BasicButton className="button--chat" disabled={!active}>
                    <Icons.Phone />
                </BasicButton>
                <BasicButton className="button--chat" disabled={!active}>
                    <Icons.Camera />
                </BasicButton>
                <BasicButton className="button--chat" disabled={!active} onClick={dispatchMarkFavorite}>
                    <Icons.Star />
                </BasicButton>
            </div>
        </div>
    );
};

export default Header;
