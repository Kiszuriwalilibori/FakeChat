import { memo } from "react";

import { BaloonVariant } from "types/types";

interface Props {
    message: string;
    variant: BaloonVariant;
}

const Baloon = (props: Props) => {
    const { message, variant } = props;

    return <div className={variant === "host" ? "baloon baloon-host" : "baloon baloon-user"}>{message}</div>;
};

export default memo(Baloon);
