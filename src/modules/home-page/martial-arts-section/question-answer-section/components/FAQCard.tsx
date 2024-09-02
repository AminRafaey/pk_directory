import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {
  ExpandIcon,
  FAQCardContainer,
  QuestionDetail,
  QuestionNumber,
} from "./faq.styled";
import { MICRO_DATA } from "src/shared/utils/micro-data";

export const FAQCard = ({ faqsData }) => {
  return (
    <FAQCardContainer
      itemProp={MICRO_DATA.MAIN_ENTITY}
      itemScope
      itemType="http://schema.org/Question"
    >
      <Accordion
        sx={{
          backgroundColor: "#3C3C3C",
          boxShadow: "none !important",
          borderBottom: "1px solid black",
          borderRadius: "4px !important",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <QuestionNumber itemProp={MICRO_DATA.NAME}>
            {faqsData?.question}
          </QuestionNumber>
        </AccordionSummary>
        <AccordionDetails
          itemProp={MICRO_DATA.ACCEPTED_ANSWER}
          itemScope
          itemType="http://schema.org/Answer"
        >
          <QuestionDetail itemProp={MICRO_DATA.TEXT}>
            {faqsData?.answer}
          </QuestionDetail>
        </AccordionDetails>
      </Accordion>
    </FAQCardContainer>
  );
};
