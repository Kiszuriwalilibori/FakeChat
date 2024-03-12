import { useCallback } from "react";
import { useSpeechRecognition } from "react-speech-kit";

export const useVoice = (createChatMessage: (text: string) => void, chatMessage: string) => {
    const { listen, listening, stop, supported } = useSpeechRecognition({
        onResult: (result: string) => {
            result && createChatMessage(chatMessage + " " + result);
        },
    });

    const isMicrophoneDisabled = !supported;

    const handleClickMicrophone = useCallback(() => {
        listening ? stop() : listen();
    }, [listening, listen, stop]);

    return { handleClickMicrophone, isMicrophoneDisabled, listening };
};

export default useVoice;
