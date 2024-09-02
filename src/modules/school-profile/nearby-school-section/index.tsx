import React from "react";
import {
  Description,
  MartialArtSchoolContainer,
  SchoolLogo,
  SchoolMartialName,
  SchoolTitle,
  Title,
} from "../components/school-profile-styled";
import { Grid, Tooltip } from "@mui/material";
import { MICRO_DATA } from "src/shared/utils/micro-data";
import { useRouter } from "next/router";

const NearBySchoolsSection = ({
  affiliationData,
  schoolName,
  neighboringSchoolsData,
}) => {
  const router = useRouter();
  const getBreakImage = (e: any) => {
    e.target.src = "/logo/dojo.png";
  };
  return (
    <div>
      <Title itemProp={MICRO_DATA.NAME}>
        Martial Arts Schools near by {schoolName}
      </Title>
      <Description itemProp={MICRO_DATA.DISAMBIGUATING_DESCRIPTION}>
        Some other options close to {schoolName}
      </Description>
      <Grid
        container
        sx={{
          marginTop: { xs: "20px", md: "50px" },
          width: "100%",
        }}
      >
        <Grid item xs={12} sm={10} lg={9}>
          <SchoolTitle>Martial arts schools</SchoolTitle>
          <MartialArtSchoolContainer>
            {neighboringSchoolsData?.slice(0, 30)?.map((data: any) => {
              return (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                    onClick={() => router.push(`/${data?.slug}`)}
                  >
                    <div
                      style={{
                        borderRadius: "50%",
                        backgroundColor: "#FCFCFC",
                        width: "32px",
                        height: "32px",
                      }}
                    >
                      <SchoolLogo
                        onError={(e) => getBreakImage(e)}
                        src={data?.schoolLogo?.[0]?.url || "/logo/dojo.png"}
                      />
                    </div>
                    <Tooltip title={data.schoolName}>
                      <SchoolMartialName style={{ marginTop: "0px" }}>
                        {data?.schoolName}
                      </SchoolMartialName>
                    </Tooltip>
                  </div>
                </>
              );
            })}
          </MartialArtSchoolContainer>
        </Grid>
        {affiliationData && (
          <Grid item xs={12} sm={6} lg={2}>
            <SchoolTitle itemProp={MICRO_DATA.NAME}>AFFILIATIONS</SchoolTitle>
            <MartialArtSchoolContainer>
              {affiliationData.map((data: any) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        borderRadius: "16px",
                      }}
                    >
                      <SchoolLogo
                        src={data?.teamLogo?.[0]?.url || "/logo/dojo.png"}
                      />
                    </div>
                    <SchoolMartialName
                      style={{ marginTop: "0px", width: "unset" }}
                    >
                      {data?.name}
                    </SchoolMartialName>
                  </div>
                );
              })}
            </MartialArtSchoolContainer>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default NearBySchoolsSection;
