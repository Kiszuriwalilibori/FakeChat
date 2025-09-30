import Icons from "assets/icons";
import { IconButton } from "components/Common";
interface Props {isPickerVisible: boolean, togglePickerVisibility: () => void}




export const EmojiButton = (props:Props) => {
    const{isPickerVisible, togglePickerVisibility}=props;
    return <IconButton 
  aria-label={isPickerVisible ? "Hide emoji picker" : "Show emoji picker"}
  aria-expanded={isPickerVisible}
  onClick={togglePickerVisibility}
  onKeyDown={(e) => {
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar') {
      e.preventDefault();
      togglePickerVisibility();
    }
  }}
>
  <Icons.Smile />
</IconButton>}
export default EmojiButton;