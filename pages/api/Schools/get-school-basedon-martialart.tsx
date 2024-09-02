import type { NextApiRequest, NextApiResponse } from "next";
import { getSchoolBasedOnMartialArt } from "services/SchoolServiceWithoutCache";

/**
 * @description - get school data against a specific martialArt and city.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return school data against a specific martialArt and city.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function SchoolBasedOnMartialArt(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await getSchoolBasedOnMartialArt({
        martialArts: req.query.martialArts as string,
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

export default SchoolBasedOnMartialArt;
