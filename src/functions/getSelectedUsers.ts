import { UserDetails } from "types";

export function getSelectedUsers(users: UserDetails[], pattern: string) {
    const sortedUsers: UserDetails[] = users
        .filter(person => {
            return (
                person.name.firstName.toLowerCase().includes(pattern.toLowerCase()) ||
                person.name.lastName.toLowerCase().includes(pattern.toLowerCase())
            );
        })
        .sort((a, b) => {
            return a.name.lastName > b.name.lastName ? -1 : 1;
        })
        .sort((a, b) => {
            return a.isFavorite === true ? -1 : 1;
        });

    return sortedUsers;
}

export default getSelectedUsers;
