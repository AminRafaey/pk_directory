import type { NextApiRequest, NextApiResponse } from "next";
import { getNeighborhoodSchoolCity } from "services/SchoolServiceWithoutCache";

/**
 * @description - get all City Data and Count how Many school exist at that city.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return get all City Data and Count how Many school exist at that city also latitude longitude neighborhood.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function NeighborhoodSchoolCity(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await getNeighborhoodSchoolCity();
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: "Server Error" });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default NeighborhoodSchoolCity;
