import type { NextApiRequest, NextApiResponse } from "next";
import { getSchoolInfoAndCreateScrapSchoolData } from "services/CrawlScrapBjjwebSchoolService";

/**
 * @description - get school info and create scrap data info.
 * @param req - Req.
 * @param res - Res.
 * @returns - Returns school info and create scrap data info.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function GetSchoolInfoAndCreateScrapData(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await getSchoolInfoAndCreateScrapSchoolData();
        res.send(data);
    } catch (error) {
        res.status(504).json({ message: "Server Error", errorMessage: error });
    }

}

export default GetSchoolInfoAndCreateScrapData;
