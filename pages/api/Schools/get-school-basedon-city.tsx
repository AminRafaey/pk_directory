import type { NextApiRequest, NextApiResponse } from "next";
import { getSchoolBasedOnCity } from "services/SchoolServiceWithoutCache";

/**
 * @description - get school data against a specific City.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return school data against a specific City.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function SchoolBasedOnCity(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await getSchoolBasedOnCity({
        city: req.query.city as string,
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

export default SchoolBasedOnCity;
