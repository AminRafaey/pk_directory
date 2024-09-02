import HomePage from "src/modules/home-page";
import React from "react";
import { styled } from "@mui/system";
import Header from "components/HeaderComponent";
import axios from "axios";
import { GetStaticProps } from "next";
import { BASE_URL } from "services/config";
import { oneHourFiftyMin } from "src/shared/utils/revalidate";
import Head from "next/head";

const Container = styled("div")({
  backgroundColor: "#fff",
  overflowY: "scroll",
  width: "100%",
  scrollbarWidth: "none",
  height: "100vh",
});

const Section = styled("div")({});

const Home = ({
  homePageSearchFieldData,
  neighborhoodData,
  totalNumberOfSchools,
  faqsData,
  popularSearchData,
  popularMartialArtsSchoolData,
  groupedMartialArtsData,
}) => {
  // for later use
  // const jsonLdData = {
  //   "@context": "http://schema.org",
  //   "@type": "EducationalOrganization",
  //   schoolList: totalNumberOfSchools?.allSchoolData?.map((school) => ({
  //     "@type": "EducationalOrganization",
  //     name: school.schoolName,
  //     url: school.website,
  //     address: {
  //       streetAddress: school?.address1,
  //       addressLocality: school?.city,
  //       addressRegion: school?.state,
  //       postalCode: school.zip,
  //       addressCountry: school.country,
  //     },
  //     contactPoint: {
  //       telephone: school.phone,
  //       contactType: "customer service",
  //     },
  //     sameAs: [school?.facebook, school?.instagram],
  //   })),
  // };

  return (
    <>
      <Head>
        <meta property="og:type" content={"Martial Arts"} />
        <meta
          property="og:description"
          content="Explore a diverse range of martial arts schools and practitioners."
        />
        <meta property="og:url" content={`https://school.dojo.plus`} />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/de1kz0ucq/image/upload/v1689002020/site-background_iowcyo.png"
        />
        <title>
          {totalNumberOfSchools?.numberOfSchoolLength ?? ""} Martial Arts
          Schools near me | DOJO+
        </title>
        <link rel="icon" href="/favicon.ico" />
        {/* for later use */}
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        /> */}
      </Head>
      <Container>
        <Header />
        <Section>
          <HomePage
            schoolData={homePageSearchFieldData}
            neighborhoodData={neighborhoodData}
            faqsData={faqsData}
            popularSearchData={popularSearchData}
            totalNumberOfSchools={totalNumberOfSchools?.numberOfSchoolLength}
            popularMartialArtsSchoolData={popularMartialArtsSchoolData}
            groupedMartialArtsData={groupedMartialArtsData}
          />
        </Section>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  
  try {
    const [
      searchField,
      cityDataResponse,
      totalNumberOfSchoolsResponse,
      faqsResponseData,
      popularSearchResponseData,
      popularMartialArtsSchoolResponseData,
      getGroupedMartialArtsResponseData,
    ] = await Promise.all([
      axios(`${BASE_URL}api/Schools/filter-homepage-fields`),
      axios(`${BASE_URL}api/Schools/neighborhood-school-city`),
      axios(`${BASE_URL}api/Schools/get-Numberof-school`),
      axios(`${BASE_URL}api/Directory/get-faqs`),
      axios(`${BASE_URL}api/Directory/get-popular-searches`),
      axios(`${BASE_URL}api/Schools/high-order-schools`),
      axios(`${BASE_URL}api/Schools/get-grouped-martialarts`),
    ]);

    const homePageSearchFieldData = searchField?.data;
    const neighborhoodData = cityDataResponse?.data;
    const totalNumberOfSchools = totalNumberOfSchoolsResponse?.data;
    const faqsData = faqsResponseData?.data;
    const popularSearchData = popularSearchResponseData?.data;
    const popularMartialArtsSchoolData =
      popularMartialArtsSchoolResponseData?.data;
    const groupedMartialArtsData = getGroupedMartialArtsResponseData?.data;
    if (homePageSearchFieldData?.length === 0 || totalNumberOfSchools === 0) {
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
        homePageSearchFieldData,
        neighborhoodData,
        totalNumberOfSchools,
        faqsData,
        popularSearchData,
        popularMartialArtsSchoolData,
        groupedMartialArtsData,
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

export default Home;
