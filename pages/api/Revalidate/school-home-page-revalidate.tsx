import type { NextApiRequest, NextApiResponse } from "next";
/**
 * @description - get .
 * @param req - Req.
 * @param res - Res.
 * @returns - Return revalidation response true or false.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function Revalidate(req: NextApiRequest, res: NextApiResponse) {
  try {
    await res.revalidate("/");
    res.send({ revalidated: true });
  } catch (err) {
    return res?.status(500)?.send(err.message);
  }
}

export default Revalidate;
