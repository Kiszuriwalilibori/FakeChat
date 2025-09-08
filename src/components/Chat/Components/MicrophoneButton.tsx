import MicIcon from "@mui/icons-material/Mic";
import { IconButton } from "components/Common";
import { useVoice } from "hooks";
import { listeningMicrophoneSx } from "./ChatInput.styles";
import { useCallback} from "react";

interface MicrophoneButtonProps {
  onTranscript: (transcript: string) => void;
  currentMessage: string;
}

export const MicrophoneButton = ({ 
  onTranscript,
  currentMessage
}: MicrophoneButtonProps) => {

  const { 
    handleClickMicrophone, 
    isMicrophoneDisabled, 
    listening 
  } = useVoice(onTranscript, currentMessage);


const handleClick = useCallback(() => {
    if (isMicrophoneDisabled) {
      console.warn('Microphone access is not available or was denied');
      return;
    }
    handleClickMicrophone();
  }, [handleClickMicrophone, isMicrophoneDisabled]);

const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);
  
  return (
    <div 
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
    <IconButton
      disabled={isMicrophoneDisabled}
      id="Microphone"
      aria-label={listening ? "Stop recording" : "Start recording"}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      sx={{ ...listeningMicrophoneSx(listening) }}
    >
      <MicIcon />
    </IconButton>
    </div>
  );
};

export default MicrophoneButton;