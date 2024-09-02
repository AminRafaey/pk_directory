import React, { useEffect, useRef, useState } from "react";
import {
  Content,
  Day,
  DayContainer,
  DaySlider,
  DaySliderContainer,
  H1,
  NoEventWrapper,
  SchedulesWrapper,
  TextWhite18UppercaseRegular,
} from "../components/school-profile-styled";
import { useTheme } from "styled-components";
import useLiveRemoteTime from "src/hooks/useLiveRemoteTime";
import ScheduleCard from "./components/ScheduleCard";
import { useResponsive } from "src/hooks/useResponsive";
import { MICRO_DATA } from "src/shared/utils/micro-data";

const ScheduleContent = ({ scheduleData }: { scheduleData?: any }) => {
  const getSchedulesForDay = (day: string): any =>
    scheduleData?.classData
      ?.filter((node: any) =>
        node.weekday?.toLowerCase()?.includes(day?.toLowerCase())
      )
      .sort(
        (firstNode: any, secondNode: any) =>
          firstNode?.timeStart - secondNode?.timeStart
      );

  const mondaySchedules = getSchedulesForDay("Monday");
  const tuesdaySchedules = getSchedulesForDay("Tuesday");
  const wednesdaySchedules = getSchedulesForDay("Wednesday");
  const thursdaySchedules = getSchedulesForDay("Thursday");
  const fridaySchedules = getSchedulesForDay("Friday");
  const saturdaySchedules = getSchedulesForDay("Saturday");
  const SundaySchedules = getSchedulesForDay("Sunday");

  const mon = useRef<HTMLHeadingElement>();
  const tue = useRef<HTMLHeadingElement>();
  const wed = useRef<HTMLHeadingElement>();
  const thu = useRef<HTMLHeadingElement>();
  const fri = useRef<HTMLHeadingElement>();
  const sat = useRef<HTMLHeadingElement>();
  const sun = useRef<HTMLHeadingElement>();

  // for later use
  //   const { t } = useTranslation();
  //   const textMonday = t("MONDAY");
  //   const textTuesday = t("TUESDAY");
  //   const textWednesday = t("WEDNESDAY");
  //   const textThursday = t("THURSDAY");
  //   const textFriday = t("FRIDAY");
  //   const textSaturday = t("SATURDAY");
  //   const textSunday = t("SUNDAY");
  //   const textNoEvent = t("We're sorry, there are no more classes today");

  const timeTables = [
    {
      id: "Monday",
      day: "MONDAY",
      schedules: mondaySchedules,
      ref: mon,
    },
    {
      id: "Tuesday",
      day: "TUESDAY",
      schedules: tuesdaySchedules,
      ref: tue,
    },
    {
      id: "Wednesday",
      day: "WEDNESDAY",
      schedules: wednesdaySchedules,
      ref: wed,
    },
    {
      id: "Thursday",
      day: "THURSDAY",
      schedules: thursdaySchedules,
      ref: thu,
    },
    {
      id: "Friday",
      day: "FRIDAY",
      schedules: fridaySchedules,
      ref: fri,
    },
    {
      id: "Saturday",
      day: "SATURDAY",
      schedules: saturdaySchedules,
      ref: sat,
    },
    {
      id: "Sunday",
      day: "SUNDAY",
      schedules: SundaySchedules,
      ref: sun,
    },
  ];

  const [schoolCurrentTime] = useState(scheduleData?.zoneTime);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const liveTime = useLiveRemoteTime(schoolCurrentTime);
  const dayWeek = new Date(liveTime).toLocaleString("en-us", {
    weekday: "long",
  });

  const [selectedDay, setSelectedDay] = useState(dayWeek.toUpperCase());
  const [filterScheduleData, setFilterScheduleData] = useState([]);

  const handleTabClick = (timeTable?: any) => {
    setSelectedDay(timeTable?.day);
  };

  useEffect(() => {
    setFilterScheduleData(getSchedulesForDay(selectedDay));
  }, [selectedDay]);

  const isMobile = useResponsive("down", "md");

  const theme: any = useTheme();
  return (
    <Content>
      <DaySliderContainer id="DaySliderContainer">
        {!isMobile ? (
          <DaySlider>
            {timeTables?.map((timeTable) => {
              return (
                <DayContainer
                  isActive={selectedDay === timeTable.day}
                  onClick={() => handleTabClick(timeTable)}
                  theme={theme}
                >
                  <Day>{timeTable?.day}</Day>
                </DayContainer>
              )
            })}
          </DaySlider>
        ) : (
          <DaySlider>
            {timeTables?.map((timeTable) => (
              <DayContainer
                isActive={selectedDay === timeTable?.day}
                onClick={() => handleTabClick(timeTable)}
                theme={theme}
              >
                <Day>{timeTable?.day?.charAt(0)}</Day>
              </DayContainer>
            ))}
          </DaySlider>
        )}
      </DaySliderContainer>
      <SchedulesWrapper>
        {filterScheduleData?.length !== 0 ? (
          <>
            {filterScheduleData?.map((val: any) => {
              return (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ScheduleCard
                    isLive
                    scheduleData={val}
                    days={days}
                    dayWeek={dayWeek}
                    schoolCurrentTime={schoolCurrentTime}
                    isMobile={isMobile}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <NoEventWrapper>
            <TextWhite18UppercaseRegular itemProp={MICRO_DATA.DISAMBIGUATING_DESCRIPTION}>
              We're sorry, there are no more classes today
            </TextWhite18UppercaseRegular>
          </NoEventWrapper>
        )}
      </SchedulesWrapper>
    </Content>
  );
};

export default ScheduleContent;
