import React from "react";
import { styled } from "@mui/system";
import SchoolProfile from "src/modules/school-profile";
import { LoadScript } from "@react-google-maps/api";
import Header from "components/HeaderComponent";
import { GetStaticPaths, GetStaticProps } from "next";
import { BASE_URL } from "services/config";
import { NEXT_PUBLIC_GOOGLE_MAPS_KEY } from "airtable.config";
import Head from "next/head";
import { oneHourFiftyMin } from "src/shared/utils/revalidate";
import axios from "axios";

const Container = styled("div")({
  overflowY: "scroll",
  width: "100%",
  scrollbarWidth: "none",
  height: "100vh",
  backgroundColor: "#282828",
});

const Section = styled("div")({});

const SchoolPage = ({
  searchFieldDataArray,
  schoolDataArray,
  scheduleDataArray,
  planDataArray,
  planMemberDataArray,
  schoolReviewsArray,
  finalNeighboringSchoolsData,
}) => {
  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "EducationalOrganization",
    name: schoolDataArray?.schoolName,
    url: `https://school.dojo.plus/school-profile/${schoolDataArray?.slug}`,
    telephone: `${schoolDataArray?.phone}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${schoolDataArray?.address1}`,
      addressLocality: `${schoolDataArray?.city}`,
      addressRegion: `${schoolDataArray?.state}`,
      postalCode: `${schoolDataArray?.zip}`,
      addressCountry: `${schoolDataArray?.country}`,
    },
    sameAs: [`${schoolDataArray?.instagram}`],
  };
  const totalRating = schoolReviewsArray?.reduce((acc, obj) => {
    return acc + (obj.rating || 0);
  }, 0);
  return (
    <>
      <Head>
        <meta property="og:type" content={"Martial Arts"} />
        <meta
          property="og:url"
          content={`https://school.dojo.plus/${schoolDataArray?.slug}`}
        />
        <meta
          property="og:description"
          content={`${schoolDataArray?.slug}  - School Profile`}
        />
        <meta
          property="og:image"
          content={schoolDataArray?.schoolLogo?.[0]?.url || "/logo/dojo.png"}
        />
        <meta property="og:type" content="website" />
        <title>
          {schoolDataArray?.schoolName
            ? `${schoolDataArray.schoolName} • `
            : ""}
          {totalRating ? `${totalRating} Reviews • ` : ""}
          {schoolDataArray?.address1 ? `${schoolDataArray.address1} • ` : ""}
          {schoolDataArray?.phone ? `${schoolDataArray.phone} | ` : ""}
          DOJO+
        </title>
        <meta
          name="description"
          content={`${totalRating} Reviews of ${schoolDataArray?.schoolName} - ${schoolReviewsArray?.[0]?.comment} - ${schoolReviewsArray?.[1]?.comment}`}
        />
        <meta
          name="keywords"
          content={`${schoolDataArray?.schoolName}, ${schoolDataArray?.neighborhood}, ${schoolDataArray?.city}, ${schoolDataArray?.state}, ${schoolDataArray?.country}, ${schoolDataArray?.displayName2FromInstructor?.[0]}`}
        />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <LoadScript googleMapsApiKey={NEXT_PUBLIC_GOOGLE_MAPS_KEY}>
        <Container>
          <Header searchField schoolData={searchFieldDataArray} />
          <Section>
            <SchoolProfile
              schoolData={schoolDataArray}
              scheduleData={scheduleDataArray}
              pricingAndPlans={planDataArray}
              planMemberDataArray={planMemberDataArray}
              schoolReviewsData={schoolReviewsArray}
              neighboringSchoolsData={finalNeighboringSchoolsData}
            />
          </Section>
        </Container>
      </LoadScript>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  let finalNeighboringSchoolsData = null;
  try {
    const baseUrlSearchField = `${BASE_URL}api/Schools/filter-homepage-fields`;
    const baseUrlSchool = `${BASE_URL}api/Schools/get-school-basedon-slug`;
    const baseUrlSchedule = `${BASE_URL}api/CheckIns/get-class-schedules`;
    const baseUrlPlansData = `${BASE_URL}api/Plans`;
    const baseUrlPlansMembers = `${BASE_URL}api/Plans/members`;
    const baseUrlSchoolReviews = `${BASE_URL}api/Schools/reviews`;
    const baseUrlNearbySchools = `${BASE_URL}api/Schools/nearest-schools`;

    const [
      searchFieldData,
      schoolData,
      scheduleData,
      planAllData,
      planMemberData,
      schoolReviewsData,
    ] = await Promise.all([
      axios.get(baseUrlSearchField),
      axios.get(baseUrlSchool, {
        params: {
          slug,
        },
      }),
      axios.get(baseUrlSchedule, {
        params: {
          slug,
          allWeek: true,
        },
      }),
      axios.get(baseUrlPlansData, {
        params: {
          slug,
        },
      }),
      axios.get(baseUrlPlansMembers, {
        params: {
          slug,
        },
      }),
      axios.get(baseUrlSchoolReviews, {
        params: {
          slug,
        },
      }),
    ]);
    const searchFieldDataArray = searchFieldData.data;
    const schoolDataArray = schoolData.data;
    const scheduleDataArray = scheduleData.data;
    const planDataArray = planAllData.data;
    const planMemberDataArray = planMemberData.data;
    const schoolReviewsArray = schoolReviewsData.data;
    if (schoolDataArray?.lat && schoolDataArray?.long) {
      const neighboringSchoolsData = await axios.get(baseUrlNearbySchools, {
        params: {
          lat: schoolDataArray?.lat,
          long: schoolDataArray?.long,
        },
      });
      finalNeighboringSchoolsData = neighboringSchoolsData?.data;
    }
    if (schoolDataArray.length === 0) {
      return {
        props: {
          notFound: true,
          data: [],
        },
      };
    }
    return {
      revalidate: oneHourFiftyMin,
      props: {
        notFound: false,
        searchFieldDataArray,
        schoolDataArray,
        scheduleDataArray,
        planDataArray,
        planMemberDataArray,
        schoolReviewsArray,
        finalNeighboringSchoolsData,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
  paths: [],
  fallback: "blocking",
});

export default SchoolPage;
