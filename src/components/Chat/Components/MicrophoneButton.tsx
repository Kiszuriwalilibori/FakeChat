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
    <>
      <div 
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0
        }}
      >
        {listening ? 'Microphone is active' : 'Microphone is ready'}
      </div>
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
    </>
  );
};

export default MicrophoneButton;