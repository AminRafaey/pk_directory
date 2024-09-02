import type { NextApiRequest, NextApiResponse } from "next";
import { getAllCountryAndCount } from "services/SchoolService";

/**
 * @description -  get all country and their check how many school exist in specific country.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return school data against a country.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function AllCountryAndCounts(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const data = await getAllCountryAndCount();
            res.send(data);
        } catch (error) {
            console.log(error);
            res.status(504).json({ message: "Server Error" });
        }
    } else {
        // Handle any other HTTP method
    }
}

export default AllCountryAndCounts;
