import type { NextApiRequest, NextApiResponse } from "next";
import { getSchoolSlug } from "services/SchoolServiceWithoutCache";
import { RevalidateFunction } from "src/shared/utils/revalidate-function";
/**
 * @description - get .
 * @param req - Req.
 * @param res - Res.
 * @returns - Return revalidation response true or false.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function ScheduleRevalidate(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await getSchoolSlug();
    const pageRoute = "schedule";
    RevalidateFunction(data, pageRoute, res);

  } catch (err) {
    return res?.status(500)?.send(err.message);
  }
}

export default ScheduleRevalidate;
