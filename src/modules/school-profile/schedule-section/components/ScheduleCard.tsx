import React, { useEffect, useState } from "react";
import useLiveRemoteTime from "src/hooks/useLiveRemoteTime";

import {
  AchievementInfo,
  AvatarContainer,
  Dash,
  Icon,
  Item,
  NameLiveContainer,
  RightArrow,
  ScheduleCardWrapper,
  ScheduleEventNameStyled,
  ScheduleItem,
  ScheduleItemWrapper,
  ScheduleOpacity,
  ScheduleTime,
  Svg,
  TextGray12Opacity,
  TextMaster,
  TextTime,
  TryFreeButton,
} from "./schedules-styled";
import { MICRO_DATA } from "src/shared/utils/micro-data";
import { formattedUTCHours } from "src/shared/utils/checkins-utils";
import UserAvatar from "components/userAvatar";
import AvatarWithRank from "components/AvatarCategory/AvatarWithRank";

type CardScheduleProps = {
  style?: React.CSSProperties;
  isLive?: boolean;
  hasEndDim?: boolean;
  schoolCurrentTime?: string | number | undefined;
  scheduleData?: any;
  days?: string[] | null;
  dayWeek?: string | null;
  isMobile?: boolean;
};

const ScheduleCard: React.FC<CardScheduleProps> = ({
  scheduleData,
  days,
  dayWeek,
  isLive,
  style,
  hasEndDim = false,
  schoolCurrentTime,
  isMobile,
}): JSX.Element => {
  const indexDayWeek = days.indexOf(dayWeek);
  const endTime = {
    hours: new Date((scheduleData?.timeEnd || 0) * 1000).getUTCHours(),
    minutes: new Date((scheduleData?.timeEnd || 0) * 1000).getUTCMinutes(),
  };
  const startTime = {
    hours: new Date((scheduleData?.timeStart || 0) * 1000).getUTCHours(),
    minutes: new Date((scheduleData?.timeStart || 0) * 1000).getUTCMinutes(),
  };

  const isInFuture = indexDayWeek < days?.indexOf(scheduleData?.weekday);

  const currentHoursIndexDayWeek = new Date(indexDayWeek || "").getHours();
  const hasEndHours = endTime?.hours < currentHoursIndexDayWeek;

  const currentIndexDayWeek = new Date(indexDayWeek || "").getMinutes();
  const hasEnd = hasEndHours
    ? true
    : endTime?.hours <= currentHoursIndexDayWeek &&
      endTime.minutes <= currentIndexDayWeek;

  const liveTime = useLiveRemoteTime(schoolCurrentTime);
  const currentHours = new Date(liveTime || "").getHours();
  const current = new Date(liveTime || "").getMinutes();

  const classDuration =
    (endTime.hours - startTime.hours) * 60 +
    (endTime.minutes - startTime.minutes);

  const ongoing =
    isInFuture || hasEnd
      ? false
      : currentHours <= endTime.hours && currentHours >= startTime.hours;

  const progress: any = ongoing
    ? classDuration -
      ((endTime.hours - currentHours) * 60 + (endTime.minutes - current))
    : null;

  const progressBar = ongoing ? (progress / classDuration) * 100 : 0;
  const start = formattedUTCHours(
    scheduleData?.timeStart,
    scheduleData?.countryFromSchoolLink?.[0]
  );
  const end = formattedUTCHours(
    scheduleData?.timeEnd,
    scheduleData?.countryFromSchoolLink?.[0]
  );

  return (
    <>
      {isMobile ? (
        <ScheduleItem
          style={{
            ...style,
          }}
          hasEnd={(hasEnd && !isLive) || (hasEnd && hasEndDim)}
          progress={progressBar}
        >
          <AvatarContainer>
            <UserAvatar
              username={scheduleData?.instructorLink}
              avatarDimension={64}
            />
          </AvatarContainer>
          <ScheduleItemWrapper>
            <NameLiveContainer>
              {ongoing && isLive && !hasEnd ? (
                <Icon src="/icons/live.svg" />
              ) : null}
            </NameLiveContainer>
            <ScheduleEventNameStyled itemProp={MICRO_DATA.PROGRAM_TYPE}>
              {scheduleData?.className}
            </ScheduleEventNameStyled>
            <TextGray12Opacity itemProp={MICRO_DATA.NAME}>
              {scheduleData?.martialArtsLink}
            </TextGray12Opacity>
            <ScheduleTime>
              <Item>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#999999"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </Svg>
                <TextTime>
                  <span itemProp={MICRO_DATA.START_TIME}>{start}</span>
                  {"  "}
                  <RightArrow src="/icons/right-arrow.svg" />
                  {"  "}
                  <span itemProp={MICRO_DATA.END_TIME}>{end}</span>
                </TextTime>
              </Item>
            </ScheduleTime>
            <ScheduleOpacity itemProp={MICRO_DATA.PROGRAM_TYPE}>
              {scheduleData?.room}
            </ScheduleOpacity>
            <TextMaster itemProp={MICRO_DATA.ADDITIONAL_NAME}>
              {scheduleData?.instructorLookup &&
                String(scheduleData?.instructorLookup)}
            </TextMaster>
          </ScheduleItemWrapper>
        </ScheduleItem>
      ) : (
        <ScheduleCardWrapper>
          <AchievementInfo>
            <ScheduleEventNameStyled itemProp={MICRO_DATA.PROGRAM_TYPE}>
              {scheduleData?.className}
            </ScheduleEventNameStyled>
            <span style={{ display: "flex", color: "grey" }}>
              <TextGray12Opacity itemProp={MICRO_DATA.NAME}>
                {scheduleData?.martialArtsLink}{" "}
              </TextGray12Opacity>
              <div style={{ marginInline: "5px" }}>{" • "}</div>
              <TextGray12Opacity itemProp={MICRO_DATA.PROGRAM_TYPE}>
                {" "}
                {scheduleData?.room}
              </TextGray12Opacity>
            </span>
            <Dash />
          </AchievementInfo>
          <div>
            {" "}
            <AvatarContainer>
              <AvatarWithRank
                avatarUserName={scheduleData?.instructorLink}
                userName={scheduleData?.instructorLookup}
              />
            </AvatarContainer>
          </div>
          <div>
            <TextTime>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#999999"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </Svg>
              <span itemProp={MICRO_DATA.START_TIME}>{start}</span>
              {"  "}
              <RightArrow src="/icons/right-arrow.svg" />
              {"  "}
              <span itemProp={MICRO_DATA.END_TIME}>{end}</span>
            </TextTime>
          </div>
          {/* work need to be done over here */}
          <div>
            <TryFreeButton variant="contained">TRY FREE CLASS</TryFreeButton>
          </div>
        </ScheduleCardWrapper>
      )}
    </>
  );
};

export default ScheduleCard;
