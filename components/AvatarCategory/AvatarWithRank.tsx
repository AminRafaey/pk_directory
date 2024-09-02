import UserAvatar from "components/userAvatar";
import React from "react";
import {
  UserAvatarInfo,
  UserBelt,
} from "../../src/modules/school-profile/schedule-section/components/schedules-styled";
import { UserName } from "../../src/modules/school-profile/components/school-profile-styled";
import { useAvatar } from "src/redux/slices/avatarSlice";
import { orderRanks } from "src/shared/utils/ranks-utils";
import { MICRO_DATA } from "src/shared/utils/micro-data";

type AvatarWithRankProps = {
  avatarUserName?: string | undefined;
  userName?: string | undefined;
  userAvatarDimension?: number | undefined;
  userNameStyle?: React.CSSProperties;
  userRankStyle?: React.CSSProperties;
};

const AvatarWithRank: React.FC<AvatarWithRankProps> = ({
  avatarUserName,
  userName,
  userAvatarDimension,
  userNameStyle,
  userRankStyle,
}) => {
  const avatarData = useAvatar(avatarUserName);
  const orderData = orderRanks(avatarData?.ranks || [])?.[0];
  
  return (
    <>
      <UserAvatar
        username={avatarUserName}
        avatarDimension={userAvatarDimension || 58}
      />
      <UserAvatarInfo>
        <UserName
          style={{ ...userNameStyle }}
          itemProp={MICRO_DATA.NAME}
        >
          {userName}
        </UserName>
        <UserBelt style={{ ...userRankStyle }} itemProp={MICRO_DATA.EDUCATIONAL_CREDENTIAL_AWARDED}>
          {orderData?.levelFromMartialArtsRanks}
        </UserBelt>
      </UserAvatarInfo>
    </>
  );
};

export default AvatarWithRank;
