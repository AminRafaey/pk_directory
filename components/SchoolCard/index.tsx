import React from "react";
import { useRouter } from "next/router";
import {
  DetailSection,
  Logo,
  LogoSection,
  MartialArtTitle,
  ReviewTitle,
  SchoolCardDetailContainer,
  SchoolInfo,
  SchoolName,
  SchoolNameDetail,
  SchoolRatingWrapper,
} from "./components/schoolcard.styled";
import { MICRO_DATA } from "src/shared/utils/micro-data";
import StarRating from "components/StarRating";

const SchoolCard = ({ data }) => {
  const sumOfAllReview = data?.ratingFromReviews?.reduce(
    (acc, current) => acc + current,
    0
  );
  const ratingStar = parseFloat(
    (sumOfAllReview / data?.ratingFromReviews?.length) as any
  ).toFixed(1);

  const getBreakImage = (e: any) => {
    e.target.src = "/assets/DefaultSchoolGrey.svg";
  };
  const router = useRouter();
  return (
    <SchoolCardDetailContainer onClick={() => router.push(`/${data?.slug}`)}>
      <LogoSection>
        <Logo
          onError={(e) => getBreakImage(e)}
          itemProp={MICRO_DATA.IMAGE}
          src={data?.schoolLogo?.[0]?.url || "/logo/dojo.png"}
          alt="Photo of School "
        />
      </LogoSection>
      <DetailSection>
        <SchoolInfo>
          <MartialArtTitle itemProp={MICRO_DATA?.BRAND}>
            {data?.martialArtsLookup?.join(", ")}
          </MartialArtTitle>
          <SchoolName itemProp={MICRO_DATA?.LEGAL_NAME}>
            {data?.schoolName}
          </SchoolName>
          <SchoolNameDetail itemProp={MICRO_DATA.ADDRESS}>
            {data?.address1}
          </SchoolNameDetail>
          <SchoolRatingWrapper
            itemProp={MICRO_DATA.AGGREGATE_RATING}
            itemScope
            itemType="https://schema.org/AggregateRating"
          >
            <StarRating
              rating={ratingStar}
              width="12px !important"
              height="12px !important"
            />
            <ReviewTitle>
              {sumOfAllReview ? (
                <span itemProp={MICRO_DATA.RATING_VALUE}>
                  {sumOfAllReview}{" "}
                </span>
              ) : (
                <span itemProp={MICRO_DATA.RATING_VALUE}>0</span>
              )}
              reviews
            </ReviewTitle>
          </SchoolRatingWrapper>
        </SchoolInfo>
      </DetailSection>
    </SchoolCardDetailContainer>
  );
};

export default SchoolCard;