import type { NextApiRequest, NextApiResponse } from "next";
import { getSchoolBasedOnSlug } from "services/SchoolServiceWithoutCache";

/**
 * @description - get school data against a specific school slug.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return school data against a specific school slug.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function SchoolBasedOnSlug(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await getSchoolBasedOnSlug({
        slug: req.query.slug as string,
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

export default SchoolBasedOnSlug;
