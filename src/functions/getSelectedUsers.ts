import { UserDetails } from "types";

export function getSelectedUsers(users: UserDetails[], pattern: string) {
    const sortedUsers: UserDetails[] = users
        .filter(person => {
            return (
                person.name.first.toLowerCase().includes(pattern.toLowerCase()) ||
                person.name.last.toLowerCase().includes(pattern.toLowerCase())
            );
        })
        .sort((a, b) => {
            return a.name.last > b.name.last ? -1 : 1;
        })
        .sort((a, b) => {
            return a.isFavorite === true ? -1 : 1;
        });

    return sortedUsers;
}

export default getSelectedUsers;
