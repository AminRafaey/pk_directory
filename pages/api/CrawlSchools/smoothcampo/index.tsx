import type { NextApiRequest, NextApiResponse } from "next";
import { sendHrefLinkToCrawlSchoolLinks } from "services/CrawlScrapSmoothCompSchoolService";

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
      const data = await sendHrefLinkToCrawlSchoolLinks(
        "https://www.google.com/search?q=site%3Ahttps%3A%2F%2Fsmoothcomp.com%2Fen%2Fclub%2F&rlz=1C1ONGR_enPK1033PK1033&oq=site&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIUCAEQRRg5GEMYgwEYsQMYgAQYigUyCAgCEEUYJxg7MgwIAxAAGEMYgAQYigUyEggEEC4YQxjHARjRAxiABBiKBTIGCAUQRRhBMgYIBhBFGDwyBggHEEUYPdIBCDEzNDhqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#ip=2"
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
