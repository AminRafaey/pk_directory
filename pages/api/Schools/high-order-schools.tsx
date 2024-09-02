import type { NextApiRequest, NextApiResponse } from "next";
import { getHighOrderRanksSchools } from "services/SchoolServiceWithoutCache";

/**
 * @description - get high order school data.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return high order school data.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function HighOrderSchools(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await getHighOrderRanksSchools();
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: "Server Error" });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default HighOrderSchools;
