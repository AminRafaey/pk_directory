import React from "react";
import {
  ClaimTitle,
  ClaimWrapper,
  FaqSection,
  FooterSection,
  FormSection,
} from "./components/claim-establishment-styled";
import EstablishmentForm from "./components/EstablishmentForm";
import FAQ from "../home-page/martial-arts-section/question-answer-section";
import LocationFooter from "components/LocationFooter";

const ClaimEstablishment = ({ faqData }) => {
  return (
    <ClaimWrapper>
      <FormSection>
        <ClaimTitle>Claim establishment</ClaimTitle>
        <EstablishmentForm />
      </FormSection>
      <FaqSection>
        <FAQ faqsData={faqData} />
      </FaqSection>
      <FooterSection>
        <LocationFooter />
      </FooterSection>
    </ClaimWrapper>
  );
};

export default ClaimEstablishment;
