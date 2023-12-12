import Moment from "react-moment";

import { memo } from "react";

interface Props {
    time: number;
}

const Time = (props: Props) => {
    const { time } = props;

    return (
        <div className="message-time">
            <Moment format="HH:mm">{time}</Moment>
        </div>
    );
};

export default memo(Time);
