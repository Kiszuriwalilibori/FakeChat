import { connect } from "react-redux";
import { RootStateType } from "types/types";
import Header from "./Chat_Header";
import Input from "./Chat_Input";
import Core from "./Chat_Core";

import "./_Chat.scss";

interface Props {
    id: string;
    userName: { first: string; last: string };
}
const Chat = (props: Props) => {
    const { id, userName } = props;
    return (
        <section className="Chat">
            <Header id={id} userName={userName} />
            <Core id={id} />
            <Input id={id} />
        </section>
    );
};

const mapStateToProps = (state: RootStateType) => ({
    userName: state.users.activeUser.name,
    id: state.users.activeUser.id,
});
export default connect(mapStateToProps, {})(Chat);
