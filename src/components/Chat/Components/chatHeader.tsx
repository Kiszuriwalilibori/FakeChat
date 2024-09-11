import Typography from "@mui/material/Typography";

import { useCallback } from "react";

import Icons from "assets/icons";

import { BasicButton } from "components";
import { useDispatchAction } from "hooks";
import { UserDetails } from "types";
import useDebouncedCallback from "hooks/useDebouncedCallback";

const TITLE = "Chat with ";
const EMPTY_TITLE = "Chat with...";

const ChatHeader = (props: Pick<UserDetails, "id" | "name">) => {
    const { name, id } = props;
    const { toggleFavorite } = useDispatchAction();
    const handleFavoriteClicked = useDebouncedCallback<HTMLButtonElement>(toggleFavorite, id);

    const isChatActive = Boolean(name && name.lastName);
    return (
        <div className="Chat__header" id="Chat_Header">
            <div>
                <span>{isChatActive ? TITLE : EMPTY_TITLE}</span>
                {isChatActive && (
                    <Typography variant="chat_header_userName">{` ${name.firstName} ${name.lastName}`}</Typography>
                )}
            </div>
            <div className="buttons">
                <BasicButton className="button--chat" disabled={!isChatActive} aria-label="start a phone call">
                    <Icons.Phone />
                </BasicButton>
                <BasicButton className="button--chat" disabled={!isChatActive} aria-label="start a video call">
                    <Icons.Camera />
                </BasicButton>
                <BasicButton
                    className="button--chat"
                    disabled={!isChatActive}
                    onClick={handleFavoriteClicked}
                    aria-label="mark as favorite"
                >
                    <Icons.Star />
                </BasicButton>
            </div>
        </div>
    );
};

export default ChatHeader;
