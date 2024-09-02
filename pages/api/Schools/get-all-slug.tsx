import type { NextApiRequest, NextApiResponse } from "next";
import { getSchoolSlugs } from "services/SchoolService";

/**
 * @description - get school Slug.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return school Slug.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function GetAllSlug(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await getSchoolSlugs();
      
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: "Server Error" });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default GetAllSlug;
