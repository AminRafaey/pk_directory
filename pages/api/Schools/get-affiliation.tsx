import type { NextApiRequest, NextApiResponse } from "next";
import {
  getAffiliationBasedOnId,
} from "services/SchoolServiceWithoutCache";

/**
 * @description - get school data based location or neighborhood or martial arts.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return school data based location or neighborhood or martial arts.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function GetAffiliations(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await getAffiliationBasedOnId({
        affiliationId: JSON.parse(req.query.affiliations as string),
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: "Server Error" });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default GetAffiliations;
