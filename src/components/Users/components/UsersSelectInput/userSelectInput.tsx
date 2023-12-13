import { useCallback, useEffect, useRef, ChangeEvent } from "react";

import Icons from "assets/icons";

import { BasicButton } from "components";
import useDebouncedCallback from "hooks/useDebouncedCallback"; //

interface Props {
    changeHandler: (value: string) => void;
}

const UserSelectInput = (props: Props) => {
    const { changeHandler } = props;
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        ref.current && ref.current.focus();
    }, []);

    const handleReset = useCallback(() => {
        if (ref.current) {
            ref.current.value = "";
            changeHandler("");
        }
    }, [ref.current, changeHandler]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        changeHandler(target.value);
    }, []);

    return (
        <div className="users--search-wrapper">
            <div className="users--search">
                <BasicButton className="button button--search flexbox-row-centered" aria-label="Search">
                    <Icons.Search />
                </BasicButton>
                <input
                    placeholder="Search..."
                    aria-label="type selected user name here for search"
                    type="text"
                    defaultValue=""
                    ref={ref}
                    onChange={handleChange}
                ></input>
                {ref.current && ref.current.value !== "" && (
                    <BasicButton
                        className="button button--reset flexbox-row-centered"
                        type="reset"
                        onClick={handleReset}
                    >
                        <Icons.Reset />
                    </BasicButton>
                )}
            </div>
        </div>
    );
};

export default UserSelectInput;
