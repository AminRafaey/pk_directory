import React from "react";
import { styled } from "@mui/system";
import Location from "src/modules/location-page";
import Header from "components/HeaderComponent";
import axios from "axios";
import { GetServerSideProps } from "next";
import { BASE_URL } from "services/config";
import Head from "next/head";
import { useRouter } from "next/router";

const Container = styled("div")({
  backgroundColor: "#fff",
  overflowY: "scroll",
  width: "100%",
  scrollbarWidth: "none",
  height: "100vh",
});

const Section = styled("div")({});

const NeighborhoodCity = ({ data }) => {
  const { query } = useRouter();
  return (
    <>
      <Head>
        <title>
        {data?.length ?? ''} Martial Arts Schools in {query?.city} neighborhood |  DOJO+
        </title>
        <meta
          property="og:description"
          content="Discover the path to discipline and self-improvement at our martial arts school."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Header searchField={false} />
        <Section>
          <Location schoolData={data} />
        </Section>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { city } = params;
  try {
    const baseUrl = `${BASE_URL}api/Schools/get-school-basedon-city`;
    const response = await axios(baseUrl, {
      params: {
        city,
      },
    });

    const data = response?.data;
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error(error);
  }

  return {
    props: {},
  };
};


export default NeighborhoodCity;
