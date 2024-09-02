import type { NextApiRequest, NextApiResponse } from "next";
import { getAllCity } from "services/SchoolServiceWithoutCache";

/**
 * @description - get school City.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return school City.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function GetAllCity(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await getAllCity();

      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: "Server Error" });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default GetAllCity;
