import type { NextApiRequest, NextApiResponse } from "next";
import { subscribeUsingEmail } from "services/CustomerService";

/**
 * @description - Email Create.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return Nothing.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function EmailSubscribe(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const data = await subscribeUsingEmail(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: "Server Error" });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default EmailSubscribe;
