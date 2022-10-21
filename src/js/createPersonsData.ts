import createPersonDetails from "./createPersonDetails";

function createPersonsData(ary: any[]) {
    return ary.map(createPersonDetails);
}

export default createPersonsData;
