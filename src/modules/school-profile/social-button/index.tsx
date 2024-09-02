import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import {
  SocialButtonName,
  SocialButtonWrapper,
} from "../components/school-profile-styled";
import { convertPhoneNumberForWhatsApp } from "src/shared/utils/convert-number-into-whatsapp";
import { MICRO_DATA } from "src/shared/utils/micro-data";

const SocialButtonComponent = ({ data }) => {
  let websiteLink;
  const [updateWebsiteLink, setUpdateWebsiteLink] = useState("");
  if (data?.website === undefined) {
    websiteLink = `${data?.domainFromDomains?.[0]}.dojoplus.site`;
  } else {
    websiteLink = data?.website;
  }
  const phoneNumber = convertPhoneNumberForWhatsApp(data?.phone || "");

  useEffect(() => {
    if (
      websiteLink &&
      !websiteLink?.startsWith("http://") &&
      !websiteLink?.startsWith("https://") &&
      !websiteLink?.startsWith("www")
    ) {
      setUpdateWebsiteLink("https://" + websiteLink);
    } else {
      setUpdateWebsiteLink(websiteLink);
    }
  }, [data?.website]);

  return (
    <>
      {data?.phone && (
        <Grid item xs={12} sm={6} lg={3}>
          <SocialButtonWrapper>
            <img src="/icons/call-icon.svg" />
            <SocialButtonName
              target="_blank"
              rel="noopener noreferrer"
              href={`https://api.whatsapp.com/send?phone=${phoneNumber}`}
              itemProp={MICRO_DATA.TELEPHONE}
            >
              {data?.phone}
            </SocialButtonName>
          </SocialButtonWrapper>
        </Grid>
      )}

      {data?.instagram && (
        <Grid item xs={12} sm={6} lg={2.5}>
          <SocialButtonWrapper>
            <img src="/icons/instagram.svg" />
            <SocialButtonName
              target="_blank"
              href={data?.instagram}
              rel="noopener noreferrer"
            >
              instagram
            </SocialButtonName>
          </SocialButtonWrapper>
        </Grid>
      )}

      <Grid item xs={12} sm={6} lg={2.5}>
        <SocialButtonWrapper>
          <img src="/icons/link-icon.svg" />
          <SocialButtonName
            href={updateWebsiteLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Official Website
          </SocialButtonName>
        </SocialButtonWrapper>
      </Grid>
    </>
  );
};

export default SocialButtonComponent;
