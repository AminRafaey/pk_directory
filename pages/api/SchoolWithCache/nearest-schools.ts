import type { NextApiRequest, NextApiResponse } from "next";
import { getNeighboringSchoolCount } from "services/SchoolService";

/**
 * @description - get specific school Data which is near of you also how many school Near of you.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return specific school Data which is near of you also how many school Near of you.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function NeighboringSchools(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await getNeighboringSchoolCount(
        parseInt(req.query.lat as string),
        parseInt(req.query.long as string)
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

export default NeighboringSchools;
