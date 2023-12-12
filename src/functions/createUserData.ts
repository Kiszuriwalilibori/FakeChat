import { UserDetails, JsonUser } from "types";

function getData(data: string | null, replacement: string = "Undisclosed") {
    return data || replacement;
}

function createUserDetails(obj: JsonUser): UserDetails {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);

    const result = {
        dob: getData(obj?.dob?.date),
        phone: getData(obj?.phone),
        name: { firstName: getData(obj?.name?.first, ""), lastName: getData(obj?.name?.last, "") },
        location: { city: getData(obj.location?.city), country: getData(obj.location?.country) },
        isFavorite: false,
        picture: obj.picture,
        nat: getData(obj?.nat, ""),
        id: array[0].toString(),
        social: { facebook: "", linkedin: "", twitter: "" },
        isOnline: Boolean(Math.round(Math.random())),
    };

    return result;
}

export function createUserData(ary: JsonUser[]) {
    return ary.map(createUserDetails);
}

export default createUserData;
