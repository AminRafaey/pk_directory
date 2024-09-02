import type { NextApiRequest, NextApiResponse } from "next";
import { subscribeUsingEmail } from "services/CustomerService";
import { getFAQ } from "services/DirectoryService";

/**
 * @description - get All FAQS From Directory.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return All FAQS Data.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function FAQS(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await getFAQ();
      
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: "Server Error" });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default FAQS;
