import Icons from "icons";
import { BasicButton } from "components";

import "./_Input.scss";
import { useRef } from "react";
interface Props {
    changeHandler: (value: string) => void;
}

const Input = (props: Props) => {
    const { changeHandler } = props;
    const ref = useRef<HTMLInputElement>(null);

    return (
        <div className="users--search-wrapper">
            <div className="users--search">
                <BasicButton className="button-usual--flexy" aria-label="Search">
                    <Icons.Search />
                </BasicButton>
                <input
                    className="form__input"
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
                        className="button-usual"
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
