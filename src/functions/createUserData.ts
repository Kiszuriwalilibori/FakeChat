import { UserDetails, RawUserDetails } from "types";

function getData(data: string | null, replacement: string = "Undisclosed") {
    return data || replacement;
}

function createUserDetails(obj: RawUserDetails): UserDetails {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);

    const result = {
        dob: getData(obj?.dob?.date),
        phone: getData(obj?.phone),
        name: { first: getData(obj?.name?.first, ""), last: getData(obj?.name?.last, "") },
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

export function createUserData(ary: RawUserDetails[]) {
    return ary.map(createUserDetails);
}

export default createUserData;
