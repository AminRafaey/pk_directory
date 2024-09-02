import type { NextApiRequest, NextApiResponse } from "next";
import { getSchoolBasedOnCountry } from "services/SchoolServiceWithoutCache";

/**
 * @description - get school data against a specific Country.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return school data against a specific Country.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function SchoolBasedOnCountry(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await getSchoolBasedOnCountry({
        country: req.query.country as string,
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

export default SchoolBasedOnCountry;
