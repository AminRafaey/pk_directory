import React from "react";
import { styled } from "@mui/system";
import Header from "components/HeaderComponent";
import axios from "axios";
import { GetStaticProps } from "next";
import { BASE_URL } from "services/config";
import { oneHourFiftyMin } from "src/shared/utils/revalidate";
import ClaimEstablishment from "src/modules/claim-establishment";

const Container = styled("div")({
  backgroundColor: "#282828",
  overflowY: "scroll",
  width: "100%",
  scrollbarWidth: "none",
  height: "100vh",
});

const Section = styled("div")({});

const ClaimEstablishmentPage = ({ data }) => {
  return (
    <Container>
      <Header />
      <Section>
        <ClaimEstablishment faqData={data} />
      </Section>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const baseUrl = `${BASE_URL}api/Directory/get-faqs`;
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
      revalidate: oneHourFiftyMin,
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

export default ClaimEstablishmentPage;
