import randomInteger from "./randomInteger";

export const getRandomDelay = () => randomInteger(5, 10) * 1000;

export default getRandomDelay;
