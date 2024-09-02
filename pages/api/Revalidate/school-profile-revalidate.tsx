import type { NextApiRequest, NextApiResponse } from "next";
import { getSchoolSlug } from "services/SchoolServiceWithoutCache";
/**
 * @description - get .
 * @param req - Req.
 * @param res - Res.
 * @returns - Return revalidation response true or false.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function SchoolProfileRevalidate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await getSchoolSlug();
    const batchSize = 100;
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      const pathToRevalidate = batch.map((item) => `/school/${item.slug}`);
      // @ts-ignore
      await res.revalidate(...pathToRevalidate);
    }
    res.send({ revalidated: true });
  } catch (err) {
    return res?.status(500)?.send(err.message);
  }
}

export default SchoolProfileRevalidate;
