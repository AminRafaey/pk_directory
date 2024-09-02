import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import {
  SchoolPageWrapper,
  BodySection,
  AvatarButtonSection,
  AvatarSection,
  Logo,
  SchoolNameReviewSection,
  SchoolName,
  ReviewSection,
  ReviewNumber,
  EditButton,
  EditText,
  AddressSection,
  DirectionLogo,
  Address,
  SocialButton,
  CoachesSection,
  ProfileWrapper,
  AffiliationsSection,
  Title,
  Description,
  ScheduleSection,
  PlanSection,
  PlanCardWrapper,
  MartialArtSection,
  MartialArtColumn,
  VerifiedTitle,
  VerifiedRoundIcon,
  MartialArtName,
  ViewMoreButton,
  TitleWithMoreButton,
  MembersSection,
  AvatarContainer,
  AvatarWrapper,
  UserName,
  AmenitiesSection,
  AmenitiesRow,
  AmenitiesTitle,
  CompeleteReviewSection,
  LocationSection,
  NearbySchoolSection,
  ReviewSectionWrapper,
  FreeTrialClassFormSection,
} from "./components/school-profile-styled";
import ScheduleContent from "./schedule-section";
import RatingCard from "./components/RatingCard";
import LocationFooter from "components/LocationFooter";
import { useResponsive } from "src/hooks/useResponsive";
import NearBySchoolsSection from "./nearby-school-section";
import SocialButtonComponent from "./social-button";
import UserAvatar from "components/userAvatar";
import AffiliationsSectionComponent from "./affiliations-section";
import PricingAndPlansComponent from "./plans";
import ReviewSectionComponent from "./review-section";
import GallerySectionComponent from "./gallery-section";
import CoachesCard from "./components/CoachesCard";
import ProfilePageMap from "./components/ProfilePageMap";
import StarRating from "components/StarRating";
import { MICRO_DATA } from "src/shared/utils/micro-data";
import LogoImage from "components/LogoImage";
import { useRouter } from "next/router";
import axios from "axios";
import FreeTrailClassComponent from "./free-trial-class-form-section/FreeTrailClassForm";
import { scrollByClassId } from "src/shared/utils/scroll-classid-utils";

const SchoolProfile = ({
  schoolData,
  scheduleData,
  pricingAndPlans,
  planMemberDataArray,
  schoolReviewsData,
  neighboringSchoolsData,
}) => {
  const [affiliationSchoolData, setAffiliationSchoolData] = useState<any>();
  const router = useRouter();
  const querySlug = router.query.slug;
  useEffect(() => {
    const hash = window.location.hash;
    const handleHashChange = () => {
      if (hash === "#schedule") {
        scrollByClassId("schedule-section");
      } else if (hash === "#trial") {
        scrollByClassId("trial-section");
      } else if (hash === "#location") {
        scrollByClassId("location-section");
      }
    };

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Check on component mount
    handleHashChange();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  const getAffiliationSchool = () => {
    const affiliations = schoolData?.affiliations;
    axios("/api/Schools/get-affiliation", {
      params: {
        affiliations: JSON.stringify(affiliations),
      },
    })
      .then((res) => {
        setAffiliationSchoolData(res?.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (schoolData?.affiliations) {
      getAffiliationSchool();
    }
  }, [schoolData?.affiliations]);

  const coachesClassData = Array.from(
    new Map(
      scheduleData?.classData?.map((item, index) => [
        item.instructorLink,
        {
          id: index,
          fullDisplayName: item.instructorLookup,
          avatarDisplayName: item.instructorLink,
        },
      ])
    ).values()
  );

  const martialArtsClassData = Array.from(
    new Set(
      scheduleData?.classData?.flatMap((item: any) =>
        item.martialArtsLink
          ? item.martialArtsLink.split(",").map((type) => type.trim())
          : []
      )
    )
  ).filter((item) => item !== undefined);

  const [totalCount, setTotalCount] = useState(0);
  const totalRating = schoolReviewsData?.reduce((acc, obj) => {
    return acc + (obj.rating || 0);
  }, 0);

  const reviewAll = (): number =>
    schoolReviewsData?.reduce((total, dataReview) => {
      return total + dataReview?.rating;
    }, 0);

  useEffect(() => {
    setTotalCount(reviewAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolReviewsData]);
  const rating = parseFloat(
    (totalCount / schoolReviewsData?.length).toFixed(1)
  );

  const mergedNameAndAvatarName = schoolData?.displayName2FromInstructor?.map(
    (value, index) => ({
      id: index,
      fullDisplayName: value,
      avatarDisplayName: schoolData?.displayNameFromInstructor?.[index],
    })
  );
  const combinedCoachesData = [
    ...coachesClassData,
    ...(mergedNameAndAvatarName || []),
  ];

  const uniqueCoaches = Array.from(
    new Map(
      combinedCoachesData
        .filter(
          (item) =>
            item.fullDisplayName !== undefined &&
            item.avatarDisplayName !== undefined
        )
        .map((item) => [item.avatarDisplayName, item])
    ).values()
  );

  const isMobile = useResponsive("down", "md");
  return (
    <div itemScope itemType="http://schema.org/EducationalOrganization">
      <SchoolPageWrapper>
        {schoolData?.gallery && (
          <GallerySectionComponent schoolData={schoolData} />
        )}

        <BodySection>
          <AvatarButtonSection>
            <AvatarSection>
              <LogoImage
                width="120px"
                height="120px"
                borderRadius="50%"
                breakWidth="80px"
                breakHeight="80px"
                logoImage={
                  schoolData?.schoolLogo?.[0]?.url ||
                  "/assets/DefaultSchoolGrey.svg"
                }
                slug={querySlug}
              />
              <SchoolNameReviewSection>
                <SchoolName itemProp={MICRO_DATA.NAME}>
                  {schoolData?.schoolName}
                </SchoolName>
                <ReviewSection itemScope itemType="https://schema.org/Review">
                  {rating ? (
                    <StarRating rating={rating} />
                  ) : (
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "#D8D8D8",
                        marginLeft: "3px",
                      }}
                    >
                      0 Reviews
                    </span>
                  )}

                  {totalRating !== 0 && (
                    <ReviewNumber
                      itemProp={MICRO_DATA.AGGREGATE_RATING}
                      itemScope
                      itemType="https://schema.org/AggregateRating"
                    >
                      {" "}
                      <span itemProp={MICRO_DATA.RATING_VALUE}>
                        {totalRating}
                      </span>{" "}
                      Reviews
                    </ReviewNumber>
                  )}
                </ReviewSection>
              </SchoolNameReviewSection>
            </AvatarSection>
            {!schoolData?.subscribeFromClaims?.[0] && (
              <EditButton onClick={() => router.push(`${querySlug}/claim`)}>
                <img src="/icons/writing-icon.svg" />
                <EditText>CLAIM ESTABLISHMENT</EditText>
              </EditButton>
            )}
          </AvatarButtonSection>
          <AddressSection>
            <DirectionLogo src="/icons/direction.svg" />
            <Address
              itemProp={MICRO_DATA.ADDRESS}
              onClick={() => {
                const url = `https://www.google.com/maps/place/${schoolData?.lat},${schoolData?.long}`;
                window.open(url, "_blank");
              }}
            >
              {schoolData?.fullAddress}
            </Address>
          </AddressSection>
          <SocialButton>
            <Grid container>
              <SocialButtonComponent data={schoolData} />
            </Grid>
          </SocialButton>
          {schoolData?.displayNameFromInstructor && (
            <CoachesSection>
              <Title itemProp={MICRO_DATA.NAME}>Coaches</Title>
              <Description itemProp={MICRO_DATA.DISAMBIGUATING_DESCRIPTION}>
                Meet the coaches that teaches on {schoolData?.schoolName}{" "}
                Martial Arts school.
              </Description>
              <ProfileWrapper>
                <Grid container>
                  {uniqueCoaches?.map((data) => (
                    <Grid xs={6} sm={3} lg={1.8}>
                      <CoachesCard data={data} />
                    </Grid>
                  ))}
                </Grid>
              </ProfileWrapper>
            </CoachesSection>
          )}

          {schoolData?.nameFromAffiliations && (
            <AffiliationsSection>
              <Title itemProp={MICRO_DATA.NAME}>Affiliations</Title>
              <Description itemProp={MICRO_DATA.DISAMBIGUATING_DESCRIPTION}>
                {schoolData?.schoolName} is officially affiliated to the
                following institutions.
              </Description>
              <Grid container>
                {affiliationSchoolData?.map((data) => (
                  <AffiliationsSectionComponent data={data} />
                ))}
              </Grid>
            </AffiliationsSection>
          )}

          <ScheduleSection id="schedule-section">
            <Title itemProp={MICRO_DATA.NAME}>Schedule</Title>
            <Description itemProp={MICRO_DATA.DISAMBIGUATING_DESCRIPTION}>
              Check Timetable for {schoolData?.schoolName} martial arts school.
            </Description>
            <ScheduleContent scheduleData={scheduleData} />
          </ScheduleSection>
          {!pricingAndPlans && (
            <PlanSection>
              <Title itemProp={MICRO_DATA.NAME}>Pricing and Plans</Title>
              <Description itemProp={MICRO_DATA.DISAMBIGUATING_DESCRIPTION}>
                {schoolData?.schoolName} offer a variety of plans and packages
                to learn martial arts.
              </Description>
              <PlanCardWrapper>
                {pricingAndPlans?.map((data) => (
                  <PricingAndPlansComponent plansData={data} />
                ))}
              </PlanCardWrapper>
            </PlanSection>
          )}
          {martialArtsClassData.length && (
            <MartialArtSection>
              <Title itemProp={MICRO_DATA.NAME}>Martial Arts</Title>
              <MartialArtColumn>
                {martialArtsClassData?.map((data: string) => (
                  <>
                    <VerifiedTitle>
                      <VerifiedRoundIcon src="/icons/verified-icon.svg" />
                      <MartialArtName
                        onClick={() =>
                          router.push(
                            `/martial-art/${data
                              ?.replace(/\s+/g, "-")
                              .toLowerCase()}`
                          )
                        }
                        itemProp={MICRO_DATA.BRAND}
                      >
                        {data}
                      </MartialArtName>
                    </VerifiedTitle>
                  </>
                ))}
              </MartialArtColumn>
            </MartialArtSection>
          )}
          {planMemberDataArray?.length !== 0 && (
            <MembersSection>
              <TitleWithMoreButton>
                <Title itemProp={MICRO_DATA.NAME}>
                  Members ({planMemberDataArray?.length})
                </Title>
                {planMemberDataArray?.length > 9 && (
                  <ViewMoreButton>SEE ALL</ViewMoreButton>
                )}
              </TitleWithMoreButton>
              <AvatarContainer>
                {/* for later use */}
                {/* [...new Array(isMobile ? 8 : 16)] */}
                {planMemberDataArray?.map((data) => {
                  return (
                    <AvatarWrapper>
                      <UserAvatar
                        username={data?.usernameFromProfile?.[0]}
                        avatarDimension={96}
                        beltHeight={16}
                      />
                      <UserName itemProp={MICRO_DATA.CUSTOMER}>
                        {data?.displayNameFromProfile}
                      </UserName>
                    </AvatarWrapper>
                  );
                })}
              </AvatarContainer>
            </MembersSection>
          )}

          {schoolData?.amenities && (
            <AmenitiesSection>
              <Title itemProp={MICRO_DATA.NAME}>Ammenites</Title>
              <AmenitiesRow>
                {schoolData?.amenities?.map((data) => (
                  <>
                    <VerifiedTitle style={{ marginRight: "90px" }}>
                      <VerifiedRoundIcon src="/icons/verified-icon.svg" />
                      <AmenitiesTitle itemProp={MICRO_DATA.ITEMS_LIST_ELEMENTS}>
                        {data}
                      </AmenitiesTitle>
                    </VerifiedTitle>
                  </>
                ))}
              </AmenitiesRow>
            </AmenitiesSection>
          )}

          <CompeleteReviewSection>
            <TitleWithMoreButton>
              <Title itemProp={MICRO_DATA.NAME}>Reviews</Title>
              {/* for later use */}
              {/* <ViewMoreButton>SEE ALL</ViewMoreButton> */}
            </TitleWithMoreButton>
            <RatingCard
              reviewData={schoolReviewsData}
              rating={rating}
              totalRating={schoolReviewsData?.length}
            />
            <ReviewSectionWrapper>
              {schoolReviewsData && (
                <>
                  {schoolReviewsData?.map((data) => (
                    <ReviewSectionComponent reviewData={data} rating={rating} />
                  ))}
                </>
              )}
            </ReviewSectionWrapper>
          </CompeleteReviewSection>
          <FreeTrialClassFormSection id="trial-section">
            <Title itemProp={MICRO_DATA.NAME}>
              Contact {schoolData?.schoolName} for Free Trial Class
            </Title>
            <FreeTrailClassComponent />
          </FreeTrialClassFormSection>
          <LocationSection>
            <Title itemProp={MICRO_DATA.NAME} id="location-section">
              Location
            </Title>
            <Description
              itemProp={MICRO_DATA.ADDRESS}
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <span itemProp={MICRO_DATA.STREET_ADDRESS}>
                {schoolData?.address1}
              </span>
              <br />
              <span itemProp={MICRO_DATA.LOCALITY_ADDRESS}>
                {schoolData?.city}
              </span>
              ,{" "}
              <span itemProp={MICRO_DATA.REGION_ADDRESS}>
                {schoolData?.state}
              </span>{" "}
              , {schoolData?.country}
            </Description>
            <ProfilePageMap schoolData={schoolData} />
          </LocationSection>
          <NearbySchoolSection>
            <NearBySchoolsSection
              affiliationData={affiliationSchoolData}
              schoolName={schoolData?.schoolName}
              neighboringSchoolsData={neighboringSchoolsData}
            />
          </NearbySchoolSection>
        </BodySection>
      </SchoolPageWrapper>
      <div>
        <LocationFooter />
      </div>
    </div>
  );
};

export default SchoolProfile;
