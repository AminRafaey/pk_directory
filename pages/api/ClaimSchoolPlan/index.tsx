import type { NextApiRequest, NextApiResponse } from "next";
import {
  createSubscriptionOfClaimSchool,
  getOTPSubscriptionOfClaimSchool,
  updateSubscriptionOfClaimSchoolWithPaymentData,
} from "services/SchoolServiceWithoutCache";

/**
 * @description - get Claim record id also post and put claim record id.
 * @param req - Req.
 * @param res - Res.
 * @returns - Returns claim record for specific claim also send record id.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function ClaimSchoolPlan(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await getOTPSubscriptionOfClaimSchool(req.query);
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: "Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const data = await createSubscriptionOfClaimSchool(req.body);
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: "Server Error" });
    }
  } else if (req.method === "PUT") {
    try {
      const data = await updateSubscriptionOfClaimSchoolWithPaymentData(req.body);
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: "Server Error" });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default ClaimSchoolPlan;
