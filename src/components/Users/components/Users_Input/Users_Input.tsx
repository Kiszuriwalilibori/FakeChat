import Icons from "assets/icons";
import { BasicButton } from "components";

import { useEffect, useRef } from "react";
interface Props {
    changeHandler: (value: string) => void;
}

const Input = (props: Props) => {
    const { changeHandler } = props;
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        ref.current && ref.current.focus();
    }, []);

    return (
        <div className="users--search-wrapper">
            <div className="users--search">
                <BasicButton className="button button--search flexbox-row-centered" aria-label="Search">
                    <Icons.Search />
                </BasicButton>
                <input
                    placeholder="Search..."
                    type="text"
                    defaultValue=""
                    ref={ref}
                    onChange={e => {
                        const target = e.target as HTMLInputElement;
                        changeHandler(target.value);
                    }}
                ></input>
                {ref.current && ref.current.value !== "" && (
                    <BasicButton
                        className="button button--reset flexbox-row-centered"
                        type="reset"
                        onClick={() => {
                            if (ref.current) {
                                ref.current.value = "";
                                changeHandler("");
                            }
                        }}
                    >
                        <Icons.Reset />
                    </BasicButton>
                )}
            </div>
        </div>
    );
};

export default Input;
