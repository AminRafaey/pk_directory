import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  AppDownloadIcon,
  BackgroundImage,
  CompleteLocation,
  GetApp,
  GetAppTitle,
  HomePageWrapper,
  LocationTextContainer,
  MartialArtSectionWrapper,
  SchoolLocation,
  SearchMainHeaderSection,
  FooterWrapper,
  SearchBarContainer,
} from "./components/home.styled";
import MartialArtSection from "./martial-arts-section";
import LocationFooter from "../../../components/LocationFooter";
import SearchBar from "components/SearchBar";
import { Skeleton } from "@mui/material";
import { MICRO_DATA } from "src/shared/utils/micro-data";

const HomePage = ({
  schoolData,
  neighborhoodData,
  faqsData,
  popularSearchData,
  totalNumberOfSchools,
  popularMartialArtsSchoolData,
  groupedMartialArtsData,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userIp, setUserIp] = useState("");
  const [userLocation, setUserLocation] = useState();
  const [city, setCity] = useState<any>();

  const apiData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.geoapify.com/v1/ipinfo?ip=${
          userIp === "::1" ? "50.73.157.178" : userIp
        }&apiKey=6e1f3d71cc814df884a09e6469b931d5`
      );
      const { city, location } = response?.data;
      setCity(city);
      setUserLocation(location);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchUserIp() {
      await axios("/api/Schools/my-route")
        .then((res) => {
          setUserIp(res?.data?.ip);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    fetchUserIp();
  }, []);

  useEffect(() => {
    if (userIp) apiData();
  }, [userIp]);

  return (
    <HomePageWrapper
      itemScope
      itemType="http://schema.org/EducationalOrganization"
    >
      <SearchMainHeaderSection>
        <BackgroundImage
          itemProp={MICRO_DATA.IMAGE}
          src="https://res.cloudinary.com/de1kz0ucq/image/upload/v1689002020/site-background_iowcyo.png"
        />
        <LocationTextContainer>
          <SchoolLocation itemProp={MICRO_DATA.DISAMBIGUATING_DESCRIPTION}>
            {isLoading ? (
              <>Martial Arts School in Your City</>
            ) : (
              <>Martial Arts Schools Near {city?.name}</>
            )}
          </SchoolLocation>
          <CompleteLocation>
            {isLoading ? (
              <Skeleton
                sx={{
                  background: "gray",
                  height: "25px",
                  width: "60%",
                }}
              />
            ) : (
              <span
                itemProp={MICRO_DATA.DISAMBIGUATING_DESCRIPTION}
              >{`Discover the ${totalNumberOfSchools} martial arts dojos near you`}</span>
            )}
          </CompleteLocation>
          <SearchBarContainer>
            <SearchBar schoolData={schoolData} />
          </SearchBarContainer>
          <GetApp>
            <a
              href="https://play.google.com/store/apps/details?id=app.bravostudio.A01F53MDJ44JKP4EKY6JSAKNWN3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AppDownloadIcon src="/icons/android.svg" />
            </a>
            <a
              href="https://apps.apple.com/pk/app/dojo/id1568453709"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AppDownloadIcon src="/icons/apple.svg" />
            </a>
            <GetAppTitle>Get DOJO+ app today</GetAppTitle>
          </GetApp>
        </LocationTextContainer>
      </SearchMainHeaderSection>
      <MartialArtSectionWrapper>
        <MartialArtSection
          city={city}
          userLocation={userLocation}
          cityData={neighborhoodData}
          isLoading={isLoading}
          faqsData={faqsData}
          popularSearchData={popularSearchData}
          popularMartialArtsSchoolData={popularMartialArtsSchoolData}
          groupedMartialArtsData={groupedMartialArtsData}
        />
      </MartialArtSectionWrapper>
      <FooterWrapper>
        <LocationFooter />
      </FooterWrapper>
    </HomePageWrapper>
  );
};

export default HomePage;
