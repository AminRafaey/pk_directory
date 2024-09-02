import type { NextApiRequest, NextApiResponse } from 'next';
import { getPlans } from 'services/PlansServices';


/**
 * @description - get all available plans.
 * @param req - Req.
 * @param res - Res.
 * @returns - Returns plans for specific schools.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function Plans(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await getPlans(
        typeof req.query.slug === 'string'
          ? req.query.slug
          : req.query?.slug[0],
      );

      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Could not get Plans' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default Plans;
