import React from "react";
import { styled } from "@mui/system";
import Header from "components/HeaderComponent";
import ClaimPaymentComponent from "src/modules/claim-payment";
import { GetStaticPaths, GetStaticProps } from "next";
import { BASE_URL } from "services/config";
import axios from "axios";
import { oneHourFiftyMin } from "src/shared/utils/revalidate";

const Container = styled("div")({
  backgroundColor: "#111111",
  overflowY: "scroll",
  width: "100%",
  scrollbarWidth: "none",
  height: "100vh",
});

const Section = styled("div")({});

const ClaimPage = ({ schoolDataArray }) => {
  return (
    <Container>
      <Header isPlanHeader />
      <Section>
        <ClaimPaymentComponent schoolData={schoolDataArray} />
      </Section>
    </Container>
  );
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  try {
    const baseUrlSchool = `${BASE_URL}api/Schools/get-school-basedon-slug`;

    const [schoolData] = await Promise.all([
      axios.get(baseUrlSchool, {
        params: {
          slug,
        },
      }),
    ]);
    const schoolDataArray = schoolData.data;

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
        schoolDataArray,
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

export default ClaimPage;
