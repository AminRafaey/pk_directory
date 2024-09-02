import type { NextApiRequest, NextApiResponse } from "next";
import { getFilterForSelectedCity } from "services/SchoolServiceWithoutCache";

/**
 * @description - get school data against a specific city.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return school data against a specific city.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function FilterHomePage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await getFilterForSelectedCity(
        req.query.selectedCity as any
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

export default FilterHomePage;
