import type { NextApiRequest, NextApiResponse } from "next";
import { subscribeUsingEmail } from "services/CustomerService";
import { getFAQ, getPopularSearches } from "services/DirectoryService";

/**
 * @description - get Popular Search Data.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return Popular Searches Data.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function PopularSearches(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await getPopularSearches();

      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: "Server Error" });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default PopularSearches;
