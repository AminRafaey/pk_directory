/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { formattedResponse } from '../src/shared/utils/airtable-utils';

import { AirtableService } from 'services';
import { PlansTable } from 'models/PlansModel';
import { AIRTABLE_PLANS } from 'airtable.config';

const palnsMember = AirtableService.base(AIRTABLE_PLANS)(
  PlansTable.AllPlansMember
);

const subscriptionTable = AirtableService.base(AIRTABLE_PLANS)(
  PlansTable.PlanSubscription
)



/**
 * @description - get all plans.
 * @returns - Return all plans.
 */

async function getPlans(slug: string) {
  try {
    const plans = await palnsMember
      .select({
        filterByFormula: `AND({Slug (from School)} = '${slug}', Disabled = FALSE())`,
      })
      .all();
    const records = formattedResponse([...plans]);
    const requests = [];
    records.forEach((record) =>
      requests.push(
        getPlanSubscribers(record.planName).then((response) => {
          record.subscribers = response;
        }),
      ),
    );
    await Promise.all(requests);
    return records;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getPlanSubscribers(planName: string) {
  try {
    const plans = await subscriptionTable
      .select({
        filterByFormula: `{Plan Name (from Plan)} = '${planName}'`,
      })
      .all();
    const records = formattedResponse([...plans]);
    return records;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getSchoolMembers(schoolSlug?) {
  try {
    const plans = await subscriptionTable
      .select({
        filterByFormula: `{School Slug (from Plan)} = '${schoolSlug}'`,
      })
      .all();
    const records = formattedResponse([...plans]);
    const arrayUniqueByKey = [
      ...new Map(
        records.map((item) => [item.usernameFromProfile?.[0], item]),
      ).values(),
    ];
    return arrayUniqueByKey;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getPlans, getSchoolMembers }
