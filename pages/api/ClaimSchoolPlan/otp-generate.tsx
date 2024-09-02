import type { NextApiRequest, NextApiResponse } from "next";
import { createOrUpdateOtpInDB } from "services/SchoolServiceWithoutCache";

/**
 * @description - get otp from db also create and update otp in db.
 * @param req - Req.
 * @param res - Res.
 * @returns - Returns otp.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function OtpGenerator(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    try {
      const data = await createOrUpdateOtpInDB(req.body);
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: `Server Error ${error}` });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default OtpGenerator;
