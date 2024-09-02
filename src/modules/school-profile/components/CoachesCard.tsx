import React from "react";
import {
  ButtonWrapper,
  ProfileContainer,
  FollowButton,
  TextWhite12Uppercase600,
  TextWhite14CapitalizeThin,
} from "./school-profile-styled";
import UserAvatar from "components/userAvatar";
import { MICRO_DATA } from "src/shared/utils/micro-data";

const CoachesCard = ({ data }) => {
  return (
    <ProfileContainer>
      <UserAvatar
        username={data?.avatarDisplayName}
        avatarDimension={96}
        beltHeight={14}
      />

      <TextWhite14CapitalizeThin
        itemProp={MICRO_DATA.COACH}
        style={{
          textAlign: "center",
          color: "#BDBDBD",
        }}
      >
        {data?.fullDisplayName}
      </TextWhite14CapitalizeThin>
      {/* work need to be done over here  */}
      <ButtonWrapper
        target="_blank"
        rel="noopener noreferrer"
        href={`https://dojo.plus/${data?.avatarDisplayName}/ranks`}
      >
        <FollowButton>
          <TextWhite12Uppercase600>FOLLOW</TextWhite12Uppercase600>
        </FollowButton>
      </ButtonWrapper>
    </ProfileContainer>
  );
};

export default CoachesCard;
