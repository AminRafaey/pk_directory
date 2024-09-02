import React from "react";
import {
  PlanContainer,
  PlanDescription,
  TextWhite18CapitalizeBold,
  buttonStylesTransparent,
} from "../components/school-profile-styled";
import { Button } from "@mui/material";
import { MICRO_DATA } from "src/shared/utils/micro-data";

const PricingAndPlansComponent = ({ plansData }) => {
  return (
    // need to be done in buy membership button
      <PlanContainer>
        <TextWhite18CapitalizeBold
          style={{
            whiteSpace: "nowrap",
            minWidth: "150px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          itemProp={MICRO_DATA.NAME}
        >
          {`${plansData?.nameFromCategory} • ${plansData?.planName}`}
        </TextWhite18CapitalizeBold>

        <PlanDescription itemProp={MICRO_DATA.DISAMBIGUATING_DESCRIPTION}>{plansData?.planDescription}</PlanDescription>
        <Button
          color="secondary"
          variant="contained"
          sx={buttonStylesTransparent}
          style={{ marginTop: "16px" }}
        >
          buy this membership
        </Button>
      </PlanContainer>
  );
};

export default PricingAndPlansComponent;
