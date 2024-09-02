import type { NextApiRequest, NextApiResponse } from "next";
import { searchHomePageSelectedGym } from "services/SchoolService";

/**
 * @description - get school data based city or country or martial arts.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return school data based city or country or martial arts.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function SearchHomePageGym(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const data = await searchHomePageSelectedGym(
                {
                    city: req.query.city as string,
                    country: req.query.country as string,
                    martialArts: req.query.martialArts as string,
                }
            );
            res.send(data);
        } catch (error) {
            console.log(error);
            res.status(504).json({ message: "Server Error" });
        }
    } else {
        // Handle any other HTTP method
    }
}

export default SearchHomePageGym;
