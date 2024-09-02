import { LinearProgress, Rating } from "@mui/material";
import React from "react";
import styled from "styled-components";
import StarRating from "components/StarRating";
import { MICRO_DATA } from "src/shared/utils/micro-data";

export const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  marginBlock: "20px",
  minWidth: "196px",
  height: "8px !important",
  borderRadius: "4px !important",
  backgroundColor: "#4F4F4F !important",
  "& .MuiLinearProgress-barColorPrimary": {
    backgroundColor: "#FF595F !important",
  },
}));

export const Container = styled("div")``;

export const ReviewCount = styled("div")(({ theme }) => ({
  fontFamily: "Saira",
  color: "#FCFCFC",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "64.12px",
}));

export const StarContainer = styled("div")(({ theme }) => ({
  marginTop: "10px",
}));
export const TotalReview = styled("div")(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "400",
  color: "#828282",
  marginTop: "7px",
  textAlign: "center",
}));

export const ReviewSection = styled("div")(({ theme }) => ({
  marginTop: "30px",
  display: "flex",

  flexDirection: "column",
  justifyContent: "center",
}));

export const ProgressContainer = styled("div")(({ theme }) => ({
  width: "35%",
  margin: "30px 24px 0px 28px",
}));

export const ReviewMainSection = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));

type RatingCardProps = {
  reviewData?: any;
  rating?: number | undefined;
  totalRating?: number | undefined;
};

const RatingCard: React.FC<RatingCardProps> = ({
  reviewData,
  rating,
  totalRating,
}) => {
  return (
    <Container>
      <ReviewMainSection itemScope itemType="https://schema.org/Review">
        <ReviewSection
          itemProp={MICRO_DATA.AGGREGATE_RATING}
          itemScope
          itemType="https://schema.org/AggregateRating"
        >
          <ReviewCount itemProp={MICRO_DATA.RATING_VALUE}>
            {rating || 0}
          </ReviewCount>
          <StarContainer>
            <StarRating rating={rating} />
          </StarContainer>
          <TotalReview>
            <span itemProp={MICRO_DATA.RATING_VALUE}>{totalRating}</span>{" "}
            reviews
          </TotalReview>
        </ReviewSection>
        <ProgressContainer>
          <ProgressBar
            variant="determinate"
            value={
              (reviewData?.filter((rev) => rev.rating === 5).length /
                reviewData?.length) *
                100 || 0
            }
          />
          <ProgressBar
            variant="determinate"
            value={
              (reviewData?.filter((rev) => rev.rating === 4).length /
                reviewData?.length) *
                100 || 0
            }
          />
          <ProgressBar
            variant="determinate"
            value={
              (reviewData?.filter((rev) => rev.rating === 3).length /
                reviewData?.length) *
                100 || 0
            }
          />
          <ProgressBar
            variant="determinate"
            value={
              (reviewData?.filter((rev) => rev.rating === 2).length /
                reviewData?.length) *
                100 || 0
            }
          />
          <ProgressBar
            variant="determinate"
            value={
              (reviewData?.filter((rev) => rev.rating === 1).length /
                reviewData?.length) *
                100 || 0
            }
          />
        </ProgressContainer>
      </ReviewMainSection>
    </Container>
  );
};

export default RatingCard;
