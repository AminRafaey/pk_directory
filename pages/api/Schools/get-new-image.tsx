import { SchoolTableFields } from "models/SchoolModel";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSchoolFull } from "services/SchoolService";

/**
 * @description - get all school data .
 * @param req - Req.
 * @param res - Res.
 * @returns - Return all school data .
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function NewImage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await getSchoolFull(
        req.query.slug as string,
        Object.values(SchoolTableFields)
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

export default NewImage;
