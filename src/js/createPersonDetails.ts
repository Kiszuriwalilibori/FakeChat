import { UserDetails } from "types/types";

function getData(data: string | null, replacement: string = "Undisclosed") {
    //return typeof data === "string" && data ? data : replacement;
    return data || replacement;
}

function createPersonDetails(obj: any): UserDetails {
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
    };

    return result;
}
export default createPersonDetails;
