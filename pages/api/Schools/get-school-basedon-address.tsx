import type { NextApiRequest, NextApiResponse } from "next";
import { getSchoolBasedOnAddress } from "services/SchoolServiceWithoutCache";

/**
 * @description - get school data against a specific Address.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return school data against a specific Address.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function SchoolBasedOnAddress(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await getSchoolBasedOnAddress({
        address: req.query.address as string,
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

export default SchoolBasedOnAddress;
