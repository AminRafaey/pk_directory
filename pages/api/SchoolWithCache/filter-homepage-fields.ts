import type { NextApiRequest, NextApiResponse } from "next";
import { getFilterForHomePage } from "services/SchoolService";

/**
 * @description - get all school data which have city,state,schoolName,martialArts,slug.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return all school data which have city,state,schoolName,martialArts,slug.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function FilterHomePageInputField(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const data = await getFilterForHomePage();
            res.send(data);
        } catch (error) {
            console.log(error);
            res.status(504).json({ message: "Server Error" });
        }
    } else {
        // Handle any other HTTP method
    }
}

export default FilterHomePageInputField;
