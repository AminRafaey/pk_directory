import type { NextApiRequest, NextApiResponse } from "next";
import { extractSchoolLinkUsingCrawl } from "services/CrawlScrapBjjwebSchoolService";


/**
 * @description - get give url of google from where we extract urls of schools during crawling
 * @param req - Req.
 * @param res - Res.
 * @returns - Returns give url of google from where we extract urls of schools.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function CrawlSchoolsLink(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await extractSchoolLinkUsingCrawl(
        "https://www.google.com/search?q=site%3Ahttps%3A%2F%2Fbjjweb.com%2Fdojo-detail&rlz=1C1ONGR_enPK1033PK1033&oq=site%3Ahttps%3A%2F%2Fbjjweb.com%2Fdojo-detail&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGEAyBggCEEUYOtIBCDY3MzlqMGo0qAIAsAIA&sourceid=chrome&ie=UTF-8#ip=1"
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: "Server Error" });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default CrawlSchoolsLink;
