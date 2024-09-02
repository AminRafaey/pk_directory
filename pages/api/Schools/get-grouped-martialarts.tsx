import type { NextApiRequest, NextApiResponse } from "next";
import { getGroupedMartialArts } from "services/SchoolServiceWithoutCache";

/**
 * @description - get grouped martialArts.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return grouped martialArts.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function GroupedMartialArts(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await getGroupedMartialArts();
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: "Server Error" });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default GroupedMartialArts;
