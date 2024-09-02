import { AirtableService } from ".";
import {
  SchoolTableFields,
  SchoolTableData,
  SchoolTableFieldsSearch,
  SchoolTableViews,
  SchoolSlug,
  SchoolTables,
} from "models/SchoolModel";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import moize from "moize";
import { distance } from "utils";
import { formattedResponse } from "src/shared/utils/airtable-utils";
import dayjs from "dayjs";
import { getTimeWithGMTOffset } from "src/shared/utils/gmt-offset-utils";
import { CheckInsTable } from "models/CheckInsModel";
import { AIRTABLE_ALL_SCHEDULE_CHECK_INS, AIRTABLE_BASE_SCHOOLS } from "airtable.config";
import PostmarkService from "./PostmarkService";
import { MESSAGING_SERVICES_ID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } from "twilio.config";
const twilioclient = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const table = AirtableService.base(AIRTABLE_BASE_SCHOOLS)(
  SchoolTables.SCHOOLS
);
const tableReviews = AirtableService.base(AIRTABLE_BASE_SCHOOLS)(
  SchoolTables.SCHOOLS_REVIEWS
);
const affiliationsTable = AirtableService.base(AIRTABLE_BASE_SCHOOLS)(
  SchoolTables.AFFILIATIONS
);

const allSchedules = AirtableService.base(AIRTABLE_ALL_SCHEDULE_CHECK_INS)(
  CheckInsTable.AllSchedulesCheckIn
)
const claim = AirtableService.base(AIRTABLE_BASE_SCHOOLS)(
  SchoolTables.CLAIMS
);

let schoolMaxRecords=2500

export async function getSchoolFull<F = SchoolTableData>(
  slug: string,
  fields: SchoolTableFieldsSearch
) {
  try {
    const [record] = await table
      .select({
        filterByFormula: `{Slug} = '${slug}'`,
        maxRecords: schoolMaxRecords,
        //fields,
      })
      .all();
    // use record.get in order to get related tables value
    return fields?.reduce(
      (acc, recordKey) => ({
        ...acc,
        [recordKey]: record?.get(recordKey) ?? null,
      }),
      {}
    ) as F;
  } catch (err) {
    console.log(err);
    throw `School ${slug} not found`;
  }
}


async function getSchoolSlugsFull(
  filterByFormula: string = ""
): Promise<SchoolSlug[]> {
  const records = await table
    .select({
      fields: [SchoolTableFields.SLUG],
      view: SchoolTableViews.ACTIVE_PAGES,
      filterByFormula,
      maxRecords: schoolMaxRecords,
    })
    .all();

  return records?.map((record) => ({
    id: record?.id,
    slug: record?.fields?.[SchoolTableFields.SLUG] || "unknown",
  }));
}

export const getSchoolSlugs = moize.promise(getSchoolSlugsFull);

export const getSchoolStaticProps: GetStaticProps<
  { school: SchoolTableData },
  SchoolSlug
> = async ({ params }) => {
  const slug = params?.slug?.toLowerCase();

  const school =
    (await getSchoolFull<SchoolTableData>(
      slug,
      Object.values(SchoolTableFields)
    )) || {};

  return {
    props: {
      school,
    },
    revalidate: 1,
  };
};

// Change this to make Build
export const getSchoolStaticPaths: GetStaticPaths<SchoolSlug> = async () => {
  const schoolSlugs = await getSchoolSlugsFull();

  return {
    paths: schoolSlugs
      ?.map((slug) => ({
        params: slug,
      })),
    // paths:[],
    fallback: "blocking",
  };
};

export type SchoolStaticProps = InferGetStaticPropsType<
  typeof getSchoolStaticProps
>;


async function getFilterForHomePage(filterByFormula: string = ""): Promise<any[]> {
  try {
    const allSchools: any = await table.select({
      filterByFormula,
      fields: [SchoolTableFields.SLUG, SchoolTableFields.MARTIAL_ARTS, SchoolTableFields.SLUG_TYPE_MARTIAL_ARTS_LOOKUP, SchoolTableFields.NAME, SchoolTableFields.FULL_ADDRESS, SchoolTableFields.CITY, SchoolTableFields.COUNTRY, SchoolTableFields.STATE, SchoolTableFields.LAST_ADDRESS],
      maxRecords: schoolMaxRecords,
    }).all();
    const formattedSchool = formattedResponse(allSchools)
    const filterData = formattedSchool?.filter((school) => school?.schoolName && school?.slug).map((schoolEle) => {
      return {
        city: schoolEle?.city,
        country: schoolEle?.country,
        state: schoolEle?.state,
        schoolName: schoolEle?.schoolName,
        martialArts: schoolEle?.martialArtsLookup?.[0],
        slug: schoolEle?.slug,
        lastAddress: schoolEle?.lastAddress,
        slugTypeMartialArt: schoolEle?.slugTypeMartialArtsLookup?.[0],
      }
    })
    return filterData
  } catch (error) {
    console.log(error);
  }
}
async function getFilterForSelectedCity(selectedCity): Promise<any[]> {
  try {
    let query = `{City} = '${selectedCity}'`;
    const records: any = await table.select({
      filterByFormula: query,
      view: SchoolTableViews.ACTIVE_PAGES,
      maxRecords: schoolMaxRecords,
    }).all();
    const formatted = formattedResponse(records)
    return formatted
  } catch (error) {
    console.log(error);
  }
}
async function getFilterForCityPage(selectedCity): Promise<any[]> {
  try {

    let query = `AND( {City} = '${selectedCity}',  OR( {Location} != '',  {Neighborhood} != '' ), {Martial Arts Lookup} != '' )`
    const records: any = await table.select({
      filterByFormula: query,
      view: SchoolTableViews.ACTIVE_PAGES,
      maxRecords: schoolMaxRecords,
    }).all();

    const formatted = formattedResponse(records)
    const finalData = formatted?.map((data) => {
      return {
        location: data?.location,
        neighborhood: data?.neighborhood,
        martialArts: data?.martialArtsLookup?.[0],
      }
    })

    return finalData
  } catch (error) {
    console.log(error);
  }
}
async function searchHomePageSelectedGym({ city, country, martialArts }: { city: string, country: string, martialArts: string }): Promise<any[]> {
  try {
    let filterQuery;

    switch (true) {
      case !country:
        filterQuery = `{City} = '${city}'`
        break;
      case !city:
        filterQuery = `{Country} = '${country}'`
        break;
      case Boolean(country && city):
        filterQuery = `AND({City} = '${city}',{Country} = '${country}')`
        break;
      default:
        filterQuery = `AND({City} = '${city}',{Country} = '${country}',{Martial Arts Lookup} = '${martialArts})`
    }

    const records: any = await table.select({
      filterByFormula: filterQuery,
      view: SchoolTableViews.ACTIVE_PAGES,
      maxRecords: schoolMaxRecords,
    }).all();

    const formatted = formattedResponse(records)
    return formatted;
  } catch (error) {
    console.log(error);
  }
}

async function searchCityPageSelectedGym({ location, neighborhood, martialArts }: { location: string, neighborhood: string, martialArts: string }): Promise<any[]> {
  try {
    let filterCityQuery;

    switch (true) {
      case !location:
        filterCityQuery = `{Neighborhood} = '${neighborhood}'`
        break;
      case !neighborhood:
        filterCityQuery = `{Location} = '${location}'`
        break;
      case Boolean(location && neighborhood):
        filterCityQuery = `AND({Neighborhood} = '${neighborhood}',{Location} = '${location}')`
        break;
      default:
        filterCityQuery = `AND({Location} = '${location}',{Neighborhood} = '${neighborhood}',{Martial Arts Lookup} = '${martialArts})`
    }

    const records: any = await table.select({
      filterByFormula: filterCityQuery,
      view: SchoolTableViews.ACTIVE_PAGES,
      maxRecords: schoolMaxRecords,
    }).all();

    const formatted = formattedResponse(records)
    return formatted;
  } catch (error) {
    console.log(error);
  }
}

async function getAllCountryAndCount(): Promise<any[]> {
  try {

    let query = `{Country}`
    const records: any = await table.select({
      filterByFormula: query,
      view: SchoolTableViews.ACTIVE_PAGES,
      maxRecords: schoolMaxRecords,
    }).all();
    const formatted = formattedResponse(records)

    const allCountry = formatted?.map((data) => data.country);
    //@ts-ignore
    const uniqueCountry = [...new Set(allCountry)]
    const allCountrySchoolData = uniqueCountry?.map((country) => {
      const count = formatted?.filter((ele) => ele.country === country).length;
      return { country, count };
    });
    return allCountrySchoolData
  } catch (error) {
    console.log(error);
  }
}


async function getNeighboringSchools(userLat: number, userLong: number) {
  let query = `AND( {long} , {lat} , {City} )`
  const records: any = await table.select({
    filterByFormula: query,
    fields: ['long', 'lat', 'Record ID', 'City'],
    view: SchoolTableViews.ACTIVE_PAGES,
    maxRecords: schoolMaxRecords,
  }).all();
  const formatted = formattedResponse(records)
  const distanceArr = formatted
    .map((el) => {
      const dist = distance(userLat, el.lat, userLong, el.long);
      return { id: el?.id, dist, ...el };
    })
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 100);
  return distanceArr;
}

async function getNeighboringSchoolCounts(userLat: number, userLong: number) {
  let query = `AND( {long} , {lat} , {City} )`

  const records: any = await table.select({
    filterByFormula: query,
    fields: ['long', 'lat', 'Record ID', 'City'],
    view: SchoolTableViews.ACTIVE_PAGES,
    maxRecords: schoolMaxRecords,
  }).all();
  const formatted = formattedResponse(records)

  const distanceArr = formatted
    ?.filter((item) => item?.city)
    .map((el) => {
      const dist = distance(userLat, el.lat, userLong, el.long);
      return { id: el?.id, dist, ...el };
    })
    .sort((a, b) => a.dist - b.dist)


  const allCity = distanceArr?.map((ele) => ele.city);
  //  @ts-ignore
  const uniqueCity = [...new Set(allCity)];

  const nearestCity = uniqueCity?.map((city) => {
    const count = distanceArr?.filter((ele) => ele.city === city).length;
    return { city, count };
  }).slice(0, 3);
  return nearestCity;

}

async function getGroupedMartialArts() {
  let query = `AND( {long} , {lat} , {City} )`

  const records: any = await table.select({
    filterByFormula: query,
    fields: [SchoolTableFields.SLUG, SchoolTableFields.LOGO, SchoolTableFields.MARTIAL_ARTS, SchoolTableFields.NAME, SchoolTableFields.ADDRESS, SchoolTableFields.RATING, SchoolTableFields.LAT, SchoolTableFields.LON],
    view: SchoolTableViews.ACTIVE_PAGES,
    maxRecords: schoolMaxRecords,
  }).all();
  const formatted = formattedResponse(records)
  const martialArtsData = {};

  formatted.forEach((obj) => {
    const martialArts = obj.martialArtsLookup;
    martialArts?.forEach((martialArt) => {
      if (!martialArtsData[martialArt]) {
        martialArtsData[martialArt] = {
          count: 0,
          schools: [],
        };
      }
      martialArtsData[martialArt].count++;
      martialArtsData[martialArt].schools.push(obj);
    });
  });
  return martialArtsData
}

async function getNeighborhoodSchoolCity() {
  let query = `AND( {long} , {lat} , {City} )`

  const records: any = await table.select({
    filterByFormula: query,
    fields: [SchoolTableFields.LAT, SchoolTableFields.LON, SchoolTableFields.NEIGHBORHOOD, SchoolTableFields.CITY],
    view: SchoolTableViews.ACTIVE_PAGES,
    maxRecords: schoolMaxRecords,
  }).all();
  const formatted = formattedResponse(records)
  const citySchoolCount = formatted.reduce((grouped, obj) => {
    const city = obj.city.trim();
    if (!grouped[city]) {
      grouped[city] = {
        count: 1,
        latitude: obj?.lat,
        longitude: obj?.long,
        neighborhood: obj?.neighborhood
      };
    } else {
      grouped[city].count++;
    }
    return grouped;
  }, {});
  const cityArray = Object.entries(citySchoolCount).map(([city, data]: any) => (
    {
      city,
      count: data.count,
      latitude: data?.latitude,
      longitude: data?.longitude,
      neighborhood: data?.neighborhood
    }));
  return cityArray;
}

async function getNumberOfSchool() {
  let query = `COUNTA({Slug})`

  const records: any = await table.select({
    filterByFormula: query,
    fields: [SchoolTableFields.SLUG],
    maxRecords: schoolMaxRecords,
  }).all();
  console.log('--------->>>>>>>>>>>>>>>>>>..',records)
  const formattedResults = formattedResponse(records)
  return { numberOfSchoolLength: formattedResults.length };
}

async function getNearestSchools(lat, long) {
  try {
    let records: any = await table
      .select({
        filterByFormula: '{long} != BLANK()',
        fields: [SchoolTableFields.SLUG, SchoolTableFields.NAME, SchoolTableFields.LOGO, SchoolTableFields.LAT, SchoolTableFields.LON, SchoolTableFields.RECORD_ID],
        maxRecords: schoolMaxRecords,
      })
      .all();
    records = formattedResponse(records);
    const distanceArr = records
      .map((el) => {
        const dist = distance(lat, el.lat, long, el.long);
        return { id: el.recordId, dist };
      })
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 30);
    const query = distanceArr.map((school) => {
      return `{Record ID} = '${school.id}'`;
    });
    const nearestSchools: any = await table
      .select({
        filterByFormula: `OR(${query.join(',')})`,
        maxRecords: schoolMaxRecords,
      })
      .all();
    return formattedResponse(nearestSchools);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getSchoolBasedOnMartialArt({ martialArts }: { martialArts: string }): Promise<any[]> {
  try {
    let filterQuery = `FIND(", ${martialArts}, ", ", " & ARRAYJOIN({Slug Type Martial Arts Lookup}) & ", ")`;
    const records: any = await table.select({
      filterByFormula: filterQuery,
      view: SchoolTableViews.ACTIVE_PAGES,
      maxRecords: schoolMaxRecords,
    }).all();

    const formatted = formattedResponse(records)
    return formatted;
  } catch (error) {
    console.log(error);
  }
}

async function getRecentlyAddedSchools(numberOfSchools: number = 10) {

  const records: any = await table.select({
    maxRecords: 10,
    sort: [{ field: 'Created At', direction: 'desc' }]
  }).all();

  const formatted = formattedResponse(records)
  const recentlyAddedSchools = formatted.slice(-numberOfSchools);
  return recentlyAddedSchools;
}

async function getSchoolBasedOnAddress({ address }: { address: string }): Promise<any[]> {
  try {
    let filterQuery = `AND({Last Address} = '${address}')`;
    const records: any = await table.select({
      filterByFormula: filterQuery,
      maxRecords: schoolMaxRecords,
    }).all();
    const formatted = formattedResponse(records)
    return formatted;
  } catch (error) {
    console.log(error);
  }
}

async function getSchoolBasedOnCity({ city }: { city: string }): Promise<any[]> {
  try {
    let filterQuery = `AND({Slug Type City} = '${city.replace(/\s+/g, '-').toLowerCase()}')`;
    const records: any = await table.select({
      filterByFormula: filterQuery,
      maxRecords: schoolMaxRecords,
    }).all();
    const formatted = formattedResponse(records)
    return formatted;
  } catch (error) {
    console.log(error);
  }
}
async function getAllCity(): Promise<any[]> {

  try {
    let filterQuery = `{Slug Type City}`
    const records: any = await table.select({
      filterByFormula: filterQuery,
      fields: [SchoolTableFields.SLUG_TYPE_CITY],
      maxRecords: schoolMaxRecords,
    }).all();
    const formatted = formattedResponse(records)
    return formatted;
  } catch (error) {
    console.log(error);
  }
}

async function getSchoolBasedOnState({ state }: { state: string }): Promise<any[]> {

  try {
    let filterQuery = `AND({Slug Type State} = '${state.replace(/\s+/g, '-').toLowerCase()}')`;
    const records: any = await table.select({
      filterByFormula: filterQuery,
      maxRecords: schoolMaxRecords,
    }).all();
    const formatted = formattedResponse(records)
    return formatted;
  } catch (error) {
    console.log(error);
  }
}

async function getAllState(): Promise<any[]> {

  try {
    let filterQuery = `{Slug Type State}`
    const records: any = await table.select({
      filterByFormula: filterQuery,
      fields: [SchoolTableFields.SLUG_TYPE_STATE],
      maxRecords: schoolMaxRecords,
    }).all();
    const formatted = formattedResponse(records)
    return formatted;
  } catch (error) {
    console.log(error);
  }
}
async function getSchoolBasedOnCountry({ country }: { country: string }): Promise<any[]> {
  console.log('Country', country)

  try {
    let filterQuery = `AND({Slug Type Country} = '${country.replace(/\s+/g, '-').toLowerCase()}')`;
    const records: any = await table.select({
      filterByFormula: filterQuery,
      maxRecords: 100,
    }).all();
    const formatted = formattedResponse(records)
    return formatted;
  } catch (error) {
    console.log(error);
  }
}

async function getAllCountry(): Promise<any[]> {

  try {
    let filterQuery = `{Slug Type Country}`
    const records: any = await table.select({
      filterByFormula: filterQuery,
      fields: [SchoolTableFields.SLUG_TYPE_COUNTRY],
      maxRecords: schoolMaxRecords,
    }).all();
    const formatted = formattedResponse(records)
    return formatted;
  } catch (error) {
    console.log(error);
  }
}

async function getSchoolBasedOnSlug({ slug }: { slug: string }): Promise<any[]> {
  try {
    let filterQuery = `AND({Slug} = '${slug}')`;
    const records: any = await table.select({
      filterByFormula: filterQuery,
      maxRecords: schoolMaxRecords,
    }).all();
    const formatted = formattedResponse(records)
    return formatted?.[0];
  } catch (error) {
    console.log(error);
  }
}

async function getCurrentSchoolClasses({
  schoolName,
  allWeek }: { schoolName: any, allWeek: any }
) {
  try {
    const records: any = await allSchedules
      .select({
        filterByFormula: `{Slug Lookup} = '${schoolName}'`,
      })
      .all();
    const recs = await formattedResponse(records);
    const timezone = getTimeWithGMTOffset(recs?.[0]?.gmtOffsetFromSchoolLink);
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const dayOfWeek = days[dayjs(timezone).day()];

    const filteredRecs = allWeek
      ? recs
      : recs?.filter((el: any) => (el?.weekday ? el?.weekday === dayOfWeek : el));
    return {
      classData: filteredRecs?.sort((a: any, b: any) => a.timeStart - b.timeStart),
      zoneTime: timezone,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getSchoolsReviews(slug) {
  try {
    const records = await tableReviews
      .select({
        filterByFormula: `{Slug (From School)} = '${slug}'`,
      })
      .all();
    return formattedResponse([...records]);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getSchoolSlug() {
  let query = `{Slug}`

  const records: any = await table.select({
    filterByFormula: query,
    fields: [SchoolTableFields.SLUG],
    maxRecords: schoolMaxRecords,
  }).all();
  const formattedResults = formattedResponse(records)
  return formattedResults;
}

async function getHighOrderRanksSchools(numberOfSchools: number = 4) {
  let filterQuery = `{Order}`;
  const records: any = await table.select({
    filterByFormula: filterQuery,
    fields: [SchoolTableFields.SLUG, SchoolTableFields.LOGO, SchoolTableFields.MARTIAL_ARTS, SchoolTableFields.NAME, SchoolTableFields.ADDRESS, SchoolTableFields.RATING],
    sort: [{ field: 'Order', direction: 'asc' }],
    maxRecords: numberOfSchools,
  }).all();
  const highRankSchools = formattedResponse(records)
  const rankAddedSchools = highRankSchools.slice(-numberOfSchools);
  return rankAddedSchools;
}

async function createSubscriptionOfClaimSchool(data) {
  try {
    const records: any = await claim.create({
      ...data,
    });
    const formattedRecord = formattedResponse([records]);
    return formattedRecord
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateSubscriptionOfClaimSchoolWithPaymentData(data) {
  try {
    const records: any = await claim.update([{ ...data }]);
    const formattedRecord = formattedResponse(records);
    return formattedRecord
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createOrUpdateOtpInDB(data) {
  try {
    const records: any = await claim.update([{ ...data }]);
    const formattedRecord = formattedResponse(records);
    const templateModel = {
      otp_code: formattedRecord?.[0]?.otp,
      email: formattedRecord?.[0]?.customerEmail,
    };
    if (formattedRecord?.[0]?.customerEmail) {
      await PostmarkService.sendSchoolClaimEmailOtp(
        templateModel,
        formattedRecord?.[0]?.customerEmail,
      );
    }
    if (formattedRecord?.[0]?.phoneNumber?.length) {
      await twilioclient.messages
        .create({
          body: `Your One-Time Password (OTP) is: ${formattedRecord?.[0]?.otp}. Enter this OTP on the Dojo Plus app to verify your subscription. If you didn't initiate this request, please ignore this message.`,
          // may be for latter use
          // from: '+18509403656',
          messagingServiceSid: MESSAGING_SERVICES_ID,
          to: formattedRecord?.[0]?.phoneNumber,
        })
    }
    return formattedRecord
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function getOTPSubscriptionOfClaimSchool(data) {
  const filterEmailQuery = `{Record ID} = '${data?.recordId}'`
  try {
    const records = await claim
      .select({
        filterByFormula: filterEmailQuery
      })
      .all();
    return formattedResponse(records);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAffiliationBasedOnId({ affiliationId }: { affiliationId: any }): Promise<any[]> {
  try {
    const filterQuery = `OR(${affiliationId.map(id => `RECORD_ID() = '${id}'`).join(', ')})`;
    const records: any = await affiliationsTable.select({
      filterByFormula: filterQuery,
      fields: [SchoolTableFields.TEAM_LOGO, SchoolTableFields.AFFILIATION_SCHOOL_NAME],
    }).all();
    const formatted = formattedResponse(records)
    return formatted;
  } catch (error) {
    console.log(error);
  }
}

export { getNeighboringSchools, createSubscriptionOfClaimSchool, getAllCity, getAllCountry, getAllState, getSchoolBasedOnState, getSchoolBasedOnCountry, getNearestSchools, createOrUpdateOtpInDB, updateSubscriptionOfClaimSchoolWithPaymentData, getOTPSubscriptionOfClaimSchool, getCurrentSchoolClasses, getSchoolSlug, getSchoolsReviews, getNumberOfSchool, getSchoolBasedOnSlug, getSchoolBasedOnAddress, getSchoolBasedOnCity, getHighOrderRanksSchools, getNeighborhoodSchoolCity, getNeighboringSchoolCounts, getFilterForHomePage, getFilterForCityPage, getAllCountryAndCount, searchHomePageSelectedGym, searchCityPageSelectedGym, getFilterForSelectedCity, getSchoolBasedOnMartialArt, getGroupedMartialArts, getAffiliationBasedOnId };
