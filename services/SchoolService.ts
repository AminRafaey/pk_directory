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
import { AIRTABLE_BASE_SCHOOLS } from "airtable.config";

const table = AirtableService.base(AIRTABLE_BASE_SCHOOLS)(
  SchoolTables.SCHOOLS
)

export async function getSchoolFull<F = SchoolTableData>(
  slug: string,
  fields: SchoolTableFieldsSearch
) {
  try {
    const [record] = await table
      .select({
        filterByFormula: `{Slug} = '${slug}'`,
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

export const getSchool = moize(getSchoolFull, {
  isDeepEqual: true,
  isPromise: true,
});

async function getSchoolSlugsFull(
  filterByFormula: string = ""
): Promise<SchoolSlug[]> {
  const records = await table
    .select({
      fields: [SchoolTableFields.SLUG],
      view: SchoolTableViews.ACTIVE_PAGES,
      filterByFormula,
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
    (await getSchool<SchoolTableData>(
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
// For Letter Use its not have try Catch

// export const getSchoolStaticPaths: GetStaticPaths<SchoolSlug> = async () => {
//   const schoolSlugs = await getSchoolSlugs();

//   return {
//     paths: schoolSlugs
//       // ISG all ther other pages
//       // ?.filter(({ slug }) => slug.startsWith("mario-sperry"))
//       ?.map((slug) => ({
//         params: slug,
//       })),
//     fallback: "blocking",
//   };
// };

// Change This to make Build
export const getSchoolStaticPaths: any = async () => {
  try {
    const schoolSlugs = await getSchoolSlugs();

    const paths = schoolSlugs.map(({ slug }) => ({
      params: { slug },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error in getSchoolStaticPaths:', error);

    return {
      paths: [
        {
          params: {
            slug: 'error',
          },
        },
      ],
      fallback: 'blocking',
    };
  }
};

export type SchoolStaticProps = InferGetStaticPropsType<
  typeof getSchoolStaticProps
>;

async function getAllSchool(filterByFormula: string = ""): Promise<any[]> {
  try {
    const records = await table
      .select({
        // fields: Object.values(SchoolTableFields),
        view: SchoolTableViews.ACTIVE_PAGES,
        filterByFormula,
      })
      .all();
    const formattedResponseData = formattedResponse([...records]);
    return formattedResponseData
  } catch (error) {
    console.log(error);
  }
}

export const getAllSchools = moize.promise(getAllSchool, {
  maxAge: 1000 * 60 * 60,
});

async function getFilterForHomePage(): Promise<any[]> {
  try {
    const allSchools = await getAllSchools();
    const filterData = allSchools?.filter((school) => school?.martialArtsLookup?.[0] && school?.country && school?.city && school?.state && school?.schoolName).map((schoolEle) => {
      return {
        city: schoolEle?.city,
        country: schoolEle?.country,
        state: schoolEle?.state,
        schoolName: schoolEle?.schoolName,
        martialArts: schoolEle?.martialArtsLookup?.[0],
      }
    })
    return filterData
  } catch (error) {
    console.log(error);
  }
}
async function getFilterForSelectedCity(selectedCity): Promise<any[]> {
  try {
    const allSchools = await getAllSchools();
    const filterCity = allSchools.filter((data) => data?.city === selectedCity)
    return filterCity
  } catch (error) {
    console.log(error);
  }
}
async function getFilterForCityPage(selectedCity): Promise<any[]> {
  try {
    const allSchools = await getAllSchools();
    const filterSelectedCity = allSchools?.filter((ele) => ele?.city === selectedCity).map((data) => data)

    const filterCityData = filterSelectedCity?.filter((school) => (school?.location || school?.neighborhood) && school?.martialArtsLookup?.[0]).map((schoolEle) => {
      return {
        location: schoolEle?.location,
        neighborhood: schoolEle?.neighborhood,
        martialArts: schoolEle?.martialArtsLookup?.[0],
      }
    })
    return filterCityData
  } catch (error) {
    console.log(error);
  }
}
async function searchHomePageSelectedGym(selectedGym): Promise<any[]> {
  try {
    const allSchools = await getAllSchools();
    let filterData;

    switch (true) {
      case !selectedGym?.country:
        filterData = allSchools?.filter((ele) => ((ele?.city === selectedGym?.city))).map((data) => data);
        break;
      case !selectedGym?.city:
        filterData = allSchools?.filter((ele) => ((ele?.country === selectedGym?.country))).map((data) => data);
        break;
      case selectedGym?.country && selectedGym?.city:
        filterData = allSchools?.filter((ele) => ((ele?.city === selectedGym?.city) && (ele?.country === selectedGym?.country))).map((data) => data);
        break;
      default:
        filterData = allSchools?.filter((ele) => ((ele?.country === selectedGym?.country) && (ele?.city === selectedGym?.city) && (ele?.martialArtsLookup?.[0] === selectedGym?.martialArts))).map((data) => data);
    }

    return filterData;
  } catch (error) {
    console.log(error);
  }
}

async function searchCityPageSelectedGym(selectedGym): Promise<any[]> {
  try {
    const allSchools = await getAllSchools();
    let filterCityData;

    switch (true) {
      case !selectedGym?.location:
        filterCityData = allSchools?.filter((ele) => ((ele?.neighborhood === selectedGym?.neighborhood))).map((data) => data);
        break;
      case !selectedGym?.neighborhood:
        filterCityData = allSchools?.filter((ele) => ((ele?.location === selectedGym?.location))).map((data) => data);
        break;
      case selectedGym?.location && selectedGym?.neighborhood:
        filterCityData = allSchools?.filter((ele) => ((ele?.neighborhood === selectedGym?.neighborhood) && (ele?.location === selectedGym?.location))).map((data) => data);
        break;
      default:
        filterCityData = allSchools?.filter((ele) => ((ele?.location === selectedGym?.location) && (ele?.neighborhood === selectedGym?.neighborhood) && (ele?.martialArtsLookup?.[0] === selectedGym?.martialArts))).map((data) => data);
    }

    return filterCityData;
  } catch (error) {
    console.log(error);
  }
}

async function getAllCountryAndCount(): Promise<any[]> {
  try {
    const allSchools = await getAllSchools();
    const filterCountryData = allSchools?.filter((school) => school?.country).map((schoolEle) => {
      return {
        country: schoolEle?.country,
      }
    })
    const allCountry = filterCountryData?.map((data) => data.country);
    //@ts-ignore
    const uniqueCountry = [...new Set(allCountry)]
    const allCountrySchoolData = uniqueCountry?.map((country) => {
      const count = filterCountryData?.filter((ele) => ele.country === country).length;
      return { country, count };
    });

    return allCountrySchoolData
  } catch (error) {
    console.log(error);
  }
}


async function getNeighboringSchools(userLat: number, userLong: number) {
  const allSchools = await getAllSchools();
  const distanceArr = allSchools
    .map((el) => {
      const dist = distance(userLat, el.lat, userLong, el.long);
      return { id: el?.id, dist, ...el };
    })
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 100);
  return distanceArr;
}

async function getNeighboringSchoolCount(userLat: number, userLong: number) {
  const allSchools = await getAllSchools();
  const distanceArr = allSchools
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



async function getHighOrderRanksSchools(numberOfSchools: number = 10) {
  const allSchools = await getAllSchools();
  const recentlyAddedSchools = allSchools.slice(-numberOfSchools);
  return recentlyAddedSchools;
}

export { getNeighboringSchools, getHighOrderRanksSchools, getNeighboringSchoolCount, getFilterForHomePage, getFilterForCityPage, getAllCountryAndCount, searchHomePageSelectedGym, searchCityPageSelectedGym, getFilterForSelectedCity };
