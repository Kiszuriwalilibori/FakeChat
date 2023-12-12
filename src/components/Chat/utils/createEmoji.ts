import { EmojiClickData } from "emoji-picker-react";

export const createEmoji = (emojiData: EmojiClickData) => {
    const ary = emojiData.unified.split("-");
    const emoArray = ary.map(item => {
        const numberEmoji = Number("0x" + item);
        if (typeof numberEmoji === "number" && !Number.isNaN(numberEmoji)) {
            const emoji = String.fromCodePoint(numberEmoji);
            return emoji;
        } else return "";
    });

    return emoArray.join("");
};

export default createEmoji;
