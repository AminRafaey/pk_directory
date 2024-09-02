/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable class-methods-use-this */

import { formattedResponse } from 'src/shared/utils/airtable-utils';
import { AirtableService } from ".";
import { PeopleTable } from 'models/PeopleModel';
import { getRank } from './RanksService';
import { AIRTABLE_BASE_PEOPLE } from 'airtable.config';

const peopleAvatarTable = AirtableService.base(AIRTABLE_BASE_PEOPLE)(
  PeopleTable.PEOPLE
);

async function getUser(username: string) {
  try {
    const records = await peopleAvatarTable
      .select({ filterByFormula: `{username} = '${username}'` })
      .all();
    return records;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserByKeyName({ value, key }: { value: string; key: string }) {
  try {
    let query = `TRIM(LOWER({${key}})) = '${value}'`;
    if (key === 'Username') {
      query = `TRIM(LOWER({Username})) = '${value}'`;
    }
    const records: any = await peopleAvatarTable.select({ filterByFormula: query }).all();
    return formattedResponse(records)[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createUser(data) {
  try {
    const records = await peopleAvatarTable.create({
      ...data,
    });

    return records;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateUser(data: any) {
  try {
    const record = await peopleAvatarTable.update([
      {
        ...data,
      },
    ]);
    return formattedResponse([...record])?.[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getallProfilesByEmail(emails: string[]) {
  try {
    const requests = [];
    let peoples = [];

    const query = emails
      .map((email) => {
        return `{Email} = '${email}'`;
      })
      .filter(Boolean);

    requests.push(
      peopleAvatarTable
        .select({
          filterByFormula: `OR(${query.join(',')})`,
        })
        .all(),
    );

    await Promise.all(requests).then((res) => {
      peoples = [...res[0]];
    });
    const formattedRecords = formattedResponse(peoples);
    return formattedRecords;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUsersDetail(users: string[], usersFields?: string[]) {
  try {
    const peopleQuery = users
      .map((record) => {
        return `{Username} = '${record}'`;
      })
      .filter(Boolean);

    let records: any = await peopleAvatarTable
      .select({
        filterByFormula: `OR(${peopleQuery.join(',')})`,
        ...(usersFields && { fields: [...usersFields] }),
      })
      .all();

    records = formattedResponse(records);
    const requests = [];
    const detailedUsers = [];
    for (let c1 = 0; c1 < records.length; c1 += 1) {
      requests.push(
        getRank(records[c1].username).then((res) => {
          detailedUsers.push({
            ...records[c1],
            ranks: res,
          });
        }),
      );
    }
    await Promise.all(requests);
    return detailedUsers;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserBySearch(searchQuery: string): Promise<any> {
  try {
    let query =
      'AND( {Email} != "", {Username} != "", {Firebase ID} != "", {Firebase ID} != "User id to link user to firebase", {First Name} != "", {Last Name} != "" )';
    if (searchQuery) {
      query = `AND(OR(SEARCH("${searchQuery
        .toLocaleLowerCase()
        .trim()}", TRIM(LOWER({Username}))), SEARCH("${searchQuery
          .toLocaleLowerCase()
          .trim()}", TRIM(LOWER({Display Name}))), SEARCH("${searchQuery
            .toLocaleLowerCase()
            .trim()}", TRIM(LOWER({Email}))) ), {Email} != "", {Username} != "", {Firebase ID} != "", {Firebase ID} != "User id to link user to firebase", {First Name} != "", {Last Name} != "" )`;
    }
    const records: any = await peopleAvatarTable
      .select({
        filterByFormula: query,
      })
      .firstPage();
    return formattedResponse(records);
  } catch (error) {
    console.log(error);
    return [];
  }
}


export { getUser, getUsersDetail, getUserByKeyName, getUserBySearch, getallProfilesByEmail, updateUser, createUser };
