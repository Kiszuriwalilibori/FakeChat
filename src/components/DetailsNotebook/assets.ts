import { Files } from "types";

export const FILES: Files = [
    {
        href: "/images/myw3schoolsimage.jpg",
        fileName: "annualPlan.doc",
    },
    {
        href: "/images/myw3schoolsimage.jpg",
        fileName: "OffersToCompanies.pdf",
    },
    {
        href: "/images/myw3schoolsimage.jpg",
        fileName: "Calculation.xls",
    },
];

export const NOTEBOOK_MEDIA_QUERY = "(min-width: 768px ) and (max-width: 1105px )";
export const NOT_NOTEBOOK_MEDIA_QUERY = "(max-width:767px) or (min-width: 1106px)";

export type Variant = "notebook" | "not-notebook";
interface Param {
    mediaQuery: string;
    direction: "down" | "left" | "right" | "up" | undefined;
    cls: string;
    id: string;
}
export type Params = { [key in Variant]: Param };
export const params: Params = {
    notebook: { mediaQuery: NOTEBOOK_MEDIA_QUERY, direction: "down", cls: "Details-notebook", id: "DetailsNotebook" },
    "not-notebook": { mediaQuery: NOT_NOTEBOOK_MEDIA_QUERY, direction: "left", cls: "Details", id: "" },
};
