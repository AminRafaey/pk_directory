import React from "react";
import { Grid } from "@mui/material";
import {
  AffiliatedSinceSchoolName,
  AffiliationCard,
  AffiliationLog,
  AffiliationSince,
  VerifiedAffiliation,
  VerifiedAffiliationName,
  VerifiedIcon,
} from "../components/school-profile-styled";
import { MICRO_DATA } from "src/shared/utils/micro-data";

const AffiliationsSectionComponent = ({ data }) => {
  const isVerified = false;
  const since = false;
  return (
    <>
      <Grid xs={12} sm={4.4} lg={3}>
        <AffiliationCard>
          <AffiliationLog src={data?.teamLogo?.[0]?.url || "/logo/dojo.png"} />
          <AffiliatedSinceSchoolName>
            <VerifiedAffiliation>
              {isVerified && (
                <VerifiedIcon src="-ro/icons/verified-curlund.svg" />
              )}
              <VerifiedAffiliationName>
                {since && 2018} AFFILIATED
              </VerifiedAffiliationName>
            </VerifiedAffiliation>
            <AffiliationSince itemProp={MICRO_DATA.AFFILIATION}>
              {data?.name}
            </AffiliationSince>
          </AffiliatedSinceSchoolName>
        </AffiliationCard>
      </Grid>
    </>
  );
};

export default AffiliationsSectionComponent;
