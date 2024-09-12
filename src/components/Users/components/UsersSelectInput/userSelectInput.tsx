import { useCallback, ChangeEvent, RefObject } from "react";
import { debounce } from "lodash";

import Icons from "assets/icons";

import { BasicButton } from "components";

interface Props {
    changeHandler: (value: string) => void;
    userSelectInputRef: RefObject<HTMLInputElement>;
}

const UserSelectInput = (props: Props) => {
    const { changeHandler, userSelectInputRef } = props;

    const handleReset = useCallback(
        debounce(() => {
            if (userSelectInputRef.current) {
                userSelectInputRef.current.value = "";
                changeHandler("");
            }
        }, 300),
        [userSelectInputRef.current, changeHandler]
    );

    const handleChange = useCallback(
        debounce((e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            changeHandler(target.value);
        }, 300),
        []
    );

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
                    ref={userSelectInputRef}
                    onChange={handleChange}
                ></input>
                {userSelectInputRef.current && userSelectInputRef.current.value !== "" && (
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
