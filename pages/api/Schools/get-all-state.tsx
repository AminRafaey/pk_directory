import type { NextApiRequest, NextApiResponse } from "next";
import {
  getAllState,
} from "services/SchoolServiceWithoutCache";

/**
 * @description - get school State.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return school State.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function GetAllState(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await getAllState();

      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: "Server Error" });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default GetAllState;
