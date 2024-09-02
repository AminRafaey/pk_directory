import type { NextApiRequest, NextApiResponse } from "next";
import { Customer, CustomerCreateResponse } from "models/CustomerModel";
import { createCustomer, signUpFreeClasses } from "services/CustomerService";
import { v4 as uuidv4 } from "uuid";
import { PostmarkService } from "services";
import { getSchool } from "services/SchoolService";
import { SchoolTableData, SchoolTableFields } from "models/SchoolModel";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CustomerCreateResponse>
) => {
  if (req.method !== "POST") {
    res.status(404).json({ result: false, error: "Method not found" });
    return;
  }

  try {
    const customer = req.body.customer as Customer;

    // await createCustomer({
    //   id: uuidv4(),
    //   ...customer,
    // });

    await signUpFreeClasses(req.body);
    // res.send(
    //   data,
    // );

    const school =
      (await getSchool<SchoolTableData>(
        customer.school_slug,
        Object.values(SchoolTableFields)
      )) || {};

    PostmarkService.sendEmail({
      From: `${customer.school_slug} <noreply@dojoplus.email>`,
      To: customer.email,
      Subject: `Hello from ${school[SchoolTableFields.NAME]}`,
      HtmlBody: `Hey ${customer.name},<br /><br />Our team at <b>${
        school[SchoolTableFields.NAME]
      }</b> is waiting for you.<br /><br />See you soon.<br /><br />OSS<br /><br>${
        school[SchoolTableFields.NAME]
      }<br />${school[SchoolTableFields.FULL_ADDRESS]}`,
      TextBody: `Hey ${customer.name}, Our team at ${
        school[SchoolTableFields.NAME]
      } is waiting for you. See you soon. OSS`,
      MessageStream: "outbound",
    });

    PostmarkService.sendEmail({
      From: `DOJO+ <noreply@dojoplus.email>`,
      To: school[SchoolTableFields.EMAIL],
      Subject: `Booking confirm for ${customer.name}`,
      HtmlBody: `Hey ${
        school[SchoolTableFields.NAME]
      },<br /><br />You got a new booking from ${customer.name} <${
        customer.email
      }><br /><br />Customer additional info: ${customer.notes}`,
      TextBody: `Hey ${
        school[SchoolTableFields.NAME]
      }, You got a new booking from ${customer.name} <${
        customer.email
      }>. Customer additional info: ${customer.notes}`,
      MessageStream: "outbound",
    });

    res.status(200).json({ result: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: false, error });
  }
};
