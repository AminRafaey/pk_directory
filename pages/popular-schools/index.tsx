import React from "react";
import { styled } from "@mui/system";
import Location from "src/modules/location-page";
import Header from "components/HeaderComponent";
import axios from "axios";
import { GetServerSideProps } from "next";
import { BASE_URL } from "services/config";
import Head from "next/head";

const Container = styled("div")({
  backgroundColor: "#fff",
  overflowY: "scroll",
  width: "100%",
  scrollbarWidth: "none",
  height: "100vh",
});

const Section = styled("div")({});

const LocationPage = ({ data }) => {
  return (
    <>
      <Head>
        <title>{data?.length ?? ""} Popular Martial Arts Schools |  DOJO+</title>
        <meta
          property="og:description"
          content="Discover the path to discipline and self-improvement at our martial arts school."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Header />
        <Section>
          <Location schoolData={data} />
        </Section>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const baseUrl = `${BASE_URL}api/Schools/high-order-schools`;
    const { data } = await axios(`${baseUrl}`);
    if (data.length === 0) {
      return {
        props: {
          notFound: true,
          data: [],
        },
      };
    }
    return {
      props: {
        notFound: false,
        data,
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

export default LocationPage;
