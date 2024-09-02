import type { NextApiRequest, NextApiResponse } from "next";
import { crawlSchoolDetails } from "services/CrawlScrapBjjwebSchoolService";


/**
 * @description - get give url of google from where we extract urls of schools
 * @param req - Req.
 * @param res - Res.
 * @returns - Returns give url of google from where we extract urls of schools.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function CrawlSchoolsLink(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await crawlSchoolDetails(
        "https://bjjweb.com/dojo-detail/1549"
      );

      res.send(data);
    } catch (error) {
      res.status(504).json({ message: "Server Error", 'EEEErrors': error });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default CrawlSchoolsLink;
