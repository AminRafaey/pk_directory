import React from "react";
import {
  AvatarRatingContainer,
  LastReview,
  LastReviewStar,
  ReviewCardContainer,
  ReviewCommentDescription,
} from "../components/school-profile-styled";
import { Skeleton } from "@mui/material";
import { timeAgo } from "src/shared/utils/time-ago";
import AvatarWithRank from "components/AvatarCategory/AvatarWithRank";
import StarRating from "components/StarRating";
import { MICRO_DATA } from "src/shared/utils/micro-data";

const ReviewSectionComponent = ({ reviewData, rating }) => {
  const formattedDayData = timeAgo(reviewData?.createdTime);
  return (
    <>
      <ReviewCardContainer>
        <LastReviewStar>
          <StarRating
            rating={rating}
            width="12px !important"
            height="12px !important"
          />
          <LastReview itemProp={MICRO_DATA.OBSERVATION_PERIOD}>{formattedDayData}</LastReview>
        </LastReviewStar>
        {false ? (
          <ReviewCommentDescription>
            <Skeleton
              sx={{
                background: "gray",
                height: "16px",
                width: "100%",
                borderRadius: "0px !important",
              }}
            />
            <Skeleton
              sx={{
                background: "gray",
                height: "16px",
                width: "100%",
                borderRadius: "0px !important",
              }}
            />
            <Skeleton
              sx={{
                background: "gray",
                height: "16px",
                width: "40%",
                borderRadius: "0px !important",
              }}
            />
          </ReviewCommentDescription>
        ) : (
          <ReviewCommentDescription itemProp={MICRO_DATA.DESCRIPTION}>
            {reviewData?.length > 136 ? (
              <>{reviewData?.comment + "..."}</>
            ) : (
              <>{reviewData?.comment}</>
            )}
          </ReviewCommentDescription>
        )}

        <AvatarRatingContainer>
          <AvatarWithRank
            avatarUserName={reviewData?.displayNameFromUser?.[0]}
            userName={reviewData?.fullNameFromUser}
            userNameStyle={{ fontSize: "12px", fontWeight: "600" }}
            userRankStyle={{ fontSize: "12px", fontWeight: "400" }}
            userAvatarDimension={41}
          />
        </AvatarRatingContainer>
      </ReviewCardContainer>
    </>
  );
};

export default ReviewSectionComponent;
