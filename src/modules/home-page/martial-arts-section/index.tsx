import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import {
  CardSection,
  CardWrapper,
  CityHead,
  CityName,
  Description,
  DescriptionButton,
  FAQWrapper,
  FindSchoolDescription,
  FindSchoolLocation,
  FindSchoolLocationTitle,
  LoadingWrapper,
  MartialArtContainer,
  MartialArtSchoolContainer,
  MartialArtTitle,
  MartialArtTitleContainer,
  MoreButton,
  MostPopularTitleButton,
  NeighborHoodContainer,
  PopularSearchButtonWrapper,
  PopularSearchContainer,
  SchoolInfo,
  SchoolName,
  SchoolNameText,
  SearchButtonPopular,
  SearchTitle,
  SkeletonCardDetailContainer,
  SkeletonContainer,
  Title,
} from "../components/home.styled";
import FAQ from "./question-answer-section";
import SchoolCard from "components/SchoolCard";
import { distance } from "utils";
import PopularSearches from "../components/PopularSearches";
import { MICRO_DATA } from "src/shared/utils/micro-data";

const MartialArtSection = ({
  city,
  userLocation,
  cityData,
  isLoading,
  faqsData,
  popularSearchData,
  popularMartialArtsSchoolData,
  groupedMartialArtsData,
}) => {
  const [randomCityData, setRandomCityData] = useState([]);
  const [neighborhoodData, setNeighborhoodData] = useState([]);
  const [nearByCity, setNearByCity] = useState([]);
  const { push } = useRouter();

  useEffect(() => {
    const unsortedData = cityData?.map((cityEle) => {
      const words = cityEle?.city?.split(" ");
      const formattedCityName = words?.map((word) => {
        return word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase();
      });
      const dist = distance(
        userLocation?.latitude,
        cityEle?.latitude,
        userLocation?.longitude,
        cityEle?.longitude
      );
      return {
        city: formattedCityName.join(" "),
        count: cityEle?.count,
        latitude: cityEle?.latitude,
        longitude: cityEle?.longitude,
        dist: dist,
        neighborhood: cityEle?.neighborhood,
        withOutWordFormatting: cityEle?.city,
      };
    });
    // For Letter Use
    // const sortedData = [...unsortedData]?.sort(
    //   (a, b) => (a?.dist ?? 0) - (b?.dist ?? 0)
    // );
    if (unsortedData) {
      const sortedData = unsortedData
        .filter((item) => item?.dist !== undefined && item?.dist !== null)
        .sort((a, b) => (a?.dist ?? 0) - (b?.dist ?? 0));
      setNearByCity(sortedData);
      setNeighborhoodData(sortedData?.filter((data) => data?.neighborhood));
    }

    setRandomCityData(unsortedData?.slice(0, 20));
  }, [userLocation]);

  return (
    <MartialArtContainer>
      <MartialArtSchoolContainer>
        <>
          {isLoading ? (
            <>
              {[...new Array(2)].map(() => {
                return (
                  <MartialArtTitleContainer>
                    <Title>
                      <Skeleton
                        sx={{
                          background: "gray",
                          height: "35px",
                          width: "40%",
                        }}
                      />
                    </Title>
                    <Description>
                      <Skeleton
                        sx={{
                          background: "gray",
                          height: "20px",
                          width: "40% ",
                        }}
                      />
                    </Description>
                    <CardSection>
                      <SkeletonContainer>
                        {[...new Array(4)].map(() => {
                          return (
                            <>
                              <SkeletonCardDetailContainer>
                                <Skeleton
                                  sx={{ background: "gray" }}
                                  height={200}
                                />
                                <SchoolInfo>
                                  <MartialArtTitle>
                                    <Skeleton
                                      sx={{
                                        background: "gray",
                                        marginTop: "-20px",
                                      }}
                                    />
                                  </MartialArtTitle>
                                  <SchoolName>
                                    <Skeleton sx={{ background: "gray" }} />
                                  </SchoolName>
                                </SchoolInfo>
                              </SkeletonCardDetailContainer>
                            </>
                          );
                        })}
                      </SkeletonContainer>
                    </CardSection>
                  </MartialArtTitleContainer>
                );
              })}
            </>
          ) : (
            <>
              <div>
                <MartialArtTitleContainer>
                  <MostPopularTitleButton>
                    <Title itemProp={MICRO_DATA.SLOGAN}>
                      Most Popular Martial Arts Schools
                    </Title>
                    <MoreButton
                      // For Future use
                      onClick={() => push("/popular-schools")}
                    >
                      VIEW MORE
                    </MoreButton>
                  </MostPopularTitleButton>
                  <CardWrapper>
                    <CardSection>
                      {popularMartialArtsSchoolData
                        ?.slice(0, 6)
                        ?.map((data) => {
                          return (
                            <>
                              <SchoolCard data={data} />
                            </>
                          );
                        })}
                    </CardSection>
                  </CardWrapper>
                </MartialArtTitleContainer>
              </div>
              <div>
                {groupedMartialArtsData &&
                  typeof groupedMartialArtsData === "object" &&
                  Object.entries(groupedMartialArtsData)?.map(
                    ([martialArt, objects]: any) => {
                      const distanceArr = objects?.schools
                        .map((el) => {
                          const dist = distance(
                            userLocation?.latitude,
                            el.lat,
                            userLocation?.longitude,
                            el.long
                          );
                          return {
                            distance: dist,
                            ...el,
                          };
                        })
                        .sort((a, b) => a.distance - b.distance)
                        .slice(0, 4);
                      return (
                        <MartialArtTitleContainer>
                          <Title itemProp={MICRO_DATA.NAME}>{martialArt}</Title>
                          <DescriptionButton>
                            <Description>
                              <span itemProp={MICRO_DATA.NUMBER_OF_LOCALITY}>
                                {objects?.count}
                              </span>{" "}
                              <span itemProp={MICRO_DATA.NAME}>
                                {martialArt}
                              </span>{" "}
                              near{" "}
                              <span itemProp={MICRO_DATA.ADDRESS_LOCALITY}>
                                {city?.name}
                              </span>
                            </Description>
                            <MoreButton
                              onClick={() =>
                                push(
                                  `/martial-art/${martialArt
                                    ?.replace(/\s+/g, "-")
                                    .toLowerCase()}`
                                )
                              }
                            >
                              VIEW MORE
                            </MoreButton>
                          </DescriptionButton>
                          <CardWrapper>
                            <CardSection>
                              {distanceArr?.map((data) => {
                                return (
                                  <>
                                    <SchoolCard data={data} />
                                  </>
                                );
                              })}
                            </CardSection>
                          </CardWrapper>
                        </MartialArtTitleContainer>
                      );
                    }
                  )}
              </div>
            </>
          )}
        </>
      </MartialArtSchoolContainer>

      <PopularSearchContainer>
        <SearchTitle itemProp={MICRO_DATA.SLOGAN}>Popular Searches</SearchTitle>
        <PopularSearchButtonWrapper>
          {popularSearchData?.map((searchData) => {
            return <PopularSearches searchData={searchData} />;
          })}
        </PopularSearchButtonWrapper>
      </PopularSearchContainer>
      <FindSchoolLocation>
        <FindSchoolLocationTitle itemProp={MICRO_DATA.SLOGAN}>
          DOJO+ find martial arts schools everywhere you are
        </FindSchoolLocationTitle>
        <FindSchoolDescription itemProp={MICRO_DATA.DISAMBIGUATING_DESCRIPTION}>
          Check out in some of our most popular cities
        </FindSchoolDescription>
        {isLoading ? (
          <LoadingWrapper>
            <CircularProgress sx={{ color: "red" }} size={40} />
          </LoadingWrapper>
        ) : (
          <Grid
            container
            sx={{
              marginTop: { xs: "20px", md: "50px" },
              width: "100%",
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              lg={neighborhoodData?.length <= 12 ? 5 : 4}
            >
              <CityHead>Nearby cities</CityHead>
              <NeighborHoodContainer>
                {nearByCity?.slice(0, 20)?.map((data: any) => {
                  return (
                    <>
                      <CityName
                        onClick={() =>
                          push(`/nearby-city/${data?.withOutWordFormatting}`)
                        }
                      >
                        <span itemProp={MICRO_DATA.ADDRESS_LOCALITY}>
                          {data?.city}
                        </span>
                        <span itemProp={MICRO_DATA.NUMBER_OF_LOCALITY}>
                          {" "}
                          ({data?.count})
                        </span>
                      </CityName>
                    </>
                  );
                })}
              </NeighborHoodContainer>
            </Grid>
            {neighborhoodData?.[0]?.neighborhood && (
              <Grid
                item
                xs={12}
                sm={6}
                lg={neighborhoodData?.length <= 12 ? 2 : 4}
              >
                <CityHead>Neighborhoods</CityHead>
                <NeighborHoodContainer>
                  {neighborhoodData?.slice(0, 20)?.map((data: any) => {
                    return (
                      <>
                        <CityName
                          onClick={() =>
                            push(
                              `/neighborhood-city/${data?.withOutWordFormatting}`
                            )
                          }
                        >
                          <span itemProp={MICRO_DATA.ADDRESS_LOCALITY}>
                            {data?.neighborhood}
                          </span>
                          <span itemProp={MICRO_DATA.NUMBER_OF_LOCALITY}>
                            {" "}
                            ({data?.count})
                          </span>
                        </CityName>
                      </>
                    );
                  })}
                </NeighborHoodContainer>
              </Grid>
            )}
            {/* For Letter Use Commented By Amin */}
            {/* <Grid
              item
              xs={12}
              sm={6}
              lg={neighborhoodData?.length <= 12 ? 5 : 4}
            >
              <CityHead>More</CityHead>
              <NeighborHoodContainer>
                {randomCityData?.map((data) => {
                  return (
                    <>
                      <CityName>
                        {data?.city} ({data?.count})
                      </CityName>
                    </>
                  );
                })}
              </NeighborHoodContainer>
            </Grid> */}
          </Grid>
        )}
      </FindSchoolLocation>
      <FAQWrapper>
        <FAQ faqsData={faqsData} />
      </FAQWrapper>
    </MartialArtContainer>
  );
};

export default MartialArtSection;
