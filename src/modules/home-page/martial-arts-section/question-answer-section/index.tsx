import React from "react";
import { FAQCard } from "./components/FAQCard";
import { FAQContainer, FaqDescription } from "./components/faq.styled";
import { MICRO_DATA } from "src/shared/utils/micro-data";

const FAQ = ({ faqsData }) => {
  return (
    <FAQContainer>
      <FaqDescription itemProp={MICRO_DATA.NAME}>Frequently Asked Questions and Answers</FaqDescription>
      {faqsData?.map((data) => {
        return <FAQCard faqsData={data} />;
      })}
    </FAQContainer>
  );
};

export default FAQ;
