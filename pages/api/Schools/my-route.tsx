import type { NextApiRequest, NextApiResponse } from "next";

/**
 * @description - get Ip Address.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return Ip Address.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function MyRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const clientIp =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      res.send({ ip: clientIp });
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: "Server Error" });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default MyRoute;
