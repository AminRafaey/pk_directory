import type { NextApiRequest, NextApiResponse } from "next";
import { getAllCrawlSchoolLinkAndUpdateRecord } from "services/CrawlScrapBjjwebSchoolService";

/**
 * @description - get Crawl School Data school link and Update Scrap Information.
 * @param req - Req.
 * @param res - Res.
 * @returns - Returns Crawl School Data school link and Update Scrap Information.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function GetAllCrawlSchoolsAndUpdateScrapInfo(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await getAllCrawlSchoolLinkAndUpdateRecord();
        res.send(data);
    } catch (error) {
        res.status(504).json({ message: "Server Error" });
    }

}

export default GetAllCrawlSchoolsAndUpdateScrapInfo;
