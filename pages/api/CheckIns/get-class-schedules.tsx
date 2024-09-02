import type { NextApiRequest, NextApiResponse } from "next";
import {
  getCurrentSchoolClasses,
} from "services/SchoolServiceWithoutCache";

/**
 * @description - get Schedule Data against a specific school slug.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return Schedule Data against a specific school slug.
 * 
 * 
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function ClassSchedule(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await getCurrentSchoolClasses({
        schoolName: req.query.slug ,
        allWeek: req.query.allWeek,
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

export default ClassSchedule;
