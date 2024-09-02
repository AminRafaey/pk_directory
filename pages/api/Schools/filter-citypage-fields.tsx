import type { NextApiRequest, NextApiResponse } from "next";
import {
  getFilterForCityPage,
} from "services/SchoolServiceWithoutCache";

/**
 * @description - get school data against a specific city based on Search.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return school data against a specific city based on Search.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function filterForSelectedCity(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await getFilterForCityPage(req.query.selectedCity as any);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: "Server Error" });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default filterForSelectedCity;
