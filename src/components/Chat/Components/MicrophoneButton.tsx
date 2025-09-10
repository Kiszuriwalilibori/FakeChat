import MicIcon from "@mui/icons-material/Mic";
import { IconButton } from "components/Common";
import { useVoice } from "hooks";
import { listeningMicrophoneSx } from "./ChatInput.styles";
import { useCallback, useEffect, useRef } from "react";

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
  
  const statusRef = useRef<HTMLDivElement>(null);

  // Announce state changes to screen readers
  useEffect(() => {
    if (statusRef.current) {
      if (listening) {
        statusRef.current.textContent = 'Recording in progress';
      } else if (isMicrophoneDisabled) {
        statusRef.current.textContent = 'Microphone access is not available';
      } else {
        statusRef.current.textContent = 'Microphone ready';
      }
    }
  }, [listening, isMicrophoneDisabled]);

  const handleClick = useCallback(() => {
    if (isMicrophoneDisabled) {
      console.warn('Microphone access is not available or was denied');
      if (statusRef.current) {
        statusRef.current.textContent = 'Microphone access was denied. Please check your browser permissions.';
      }
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
        ref={statusRef}
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
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        sx={listening ? listeningMicrophoneSx(true) : {}}
        disabled={isMicrophoneDisabled}
        data-testid="microphone-button"
        aria-label={listening ? 'Stop recording' : 'Start recording'}
        aria-pressed={listening}
        aria-haspopup="false"
        title={listening ? 'Stop recording (Space/Enter)' : 'Start voice recording (Space/Enter)'}
      >
        <MicIcon aria-hidden="true" />
        <span className="sr-only">{listening ? 'Stop recording' : 'Start recording'}</span>
      </IconButton>
    </>
  );
};

export default MicrophoneButton;