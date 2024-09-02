import { SchoolTableFields } from "models/SchoolModel";
import { Page } from "components/Page";
import {
  getSchoolStaticProps,
  SchoolStaticProps,
} from "services/SchoolService";
import {
  ScheduleTableFields,
  TimeScheduleTableData,
  Weekday,
} from "models/ScheduleModel";
import Head from "next/head";
import {
  getScheduleStaticProps,
  ScheduleStaticProps,
} from "services/ScheduleService";
import deepmerge from "deepmerge";
import styles from "styles/Schedule.module.scss";
import { Link, Element, scroller } from "react-scroll";
import { useEffect, useRef } from "react";
import cx from "classnames";
import { useRouter } from "next/router";

export { getSchoolStaticPaths as getStaticPaths } from "services/SchoolService";

export const getStaticProps = async (params) =>
  deepmerge(
    // @ts-ignore
    ...(await Promise.all([
      getSchoolStaticProps(params),
      getScheduleStaticProps(params),
    ]))
  );

export const createDaySchedule = (
  day: string,
  schedule: TimeScheduleTableData[]
) => {
  const scheduleElements = schedule
    .filter(
      (scheduleItem) =>
        scheduleItem[ScheduleTableFields.WEEKDAY]?.toLowerCase() ===
        day.toLowerCase()
    )
    .map((scheduleItem, index) => (
      <div
        itemType="https://schema.org/Event"
        className={styles.itemWrapper}
        key={index}
      >
        <div className={styles.item}>
          <h3 className={cx(styles.eventName, "text-base")} itemProp="name">
            {scheduleItem[ScheduleTableFields.CLASS_NAME]}
          </h3>
          <span className="opacity-50" itemProp="category">
            {scheduleItem[ScheduleTableFields.MARTIAL_ART]}
          </span>
          <span className={cx(styles.time, "text-base")}>
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1 opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span
                itemProp="startTime"
                data-content={scheduleItem[ScheduleTableFields.START_TIME]}
              >
                {scheduleItem[ScheduleTableFields.START_TIME]} →{" "}
                <span itemProp="endTime">
                  {scheduleItem[ScheduleTableFields.END_TIME]}
                </span>
              </span>
            </span>
          </span>
          <span className="opacity-50" itemProp="location">
            {scheduleItem[ScheduleTableFields.ROOM]}
          </span>
          <span className="text-sm" itemProp="instructor">
            {scheduleItem[ScheduleTableFields.INSTRUCTOR]}
          </span>
        </div>
      </div>
    ));
  return scheduleElements.length ? (
    scheduleElements
  ) : (
    <span>No events for this day</span>
  );
};

export default function SchedulePage({
  school,
  schedule,
}: SchoolStaticProps & ScheduleStaticProps) {
  const scheduleScrollRef = useRef<HTMLDivElement>();

  const { query } = useRouter();

  useEffect(() => {
    const d = new Date();
    const wday = d.getDay();

    if (wday !== 1 && location.hash === "") {
      const dayIndex = wday === 0 ? 6 : wday - 1;

      const element = Weekday[dayIndex].toLowerCase();

      // scrollIntoView break layout
      document.getElementById(`menu-item-${element}`)?.click();
    }
  }, []);

  return school ? (
    <Page
      school={school}
      topBarChildren={
        schedule?.length ? (
          <ul className={styles.navDay}>
            {Weekday.map((day, key) => (
              <li key={key}>
                <Link
                  id={`menu-item-${day.toLowerCase()}`}
                  href={`#${day.toLowerCase()}`}
                  isDynamic={true}
                  activeClass={styles.navItemActive}
                  className={styles.navItem}
                  to={day.toLowerCase()}
                  containerId="main"
                  spy={true}
                  smooth={true}
                  duration={250}
                >
                  <span className={styles.navDayName}>
                    {day.charAt(0).toUpperCase()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : undefined
      }
    >
      <Head>
        <meta property="og:type" content={"Martial Arts"} />
        <meta property="og:url" content={`${query?.schoolId}`} />
        <meta
          name="og:description"
          content={school[SchoolTableFields.NAME] + " - Schedules"}
        />
        <meta
          property="og:image"
          data-content={
            school[SchoolTableFields.LOGO] ?? school[SchoolTableFields.LOGO]
          }
        />
        <meta property="og:url" content={school[SchoolTableFields.SLUG]} />
        <meta property="og:type" content="website" />
          {/* Below Content i don't from where its come verifiy this  */}
        <meta
          name="keywords"
          content={`${school[SchoolTableFields.NAME]} Schedule, ${
            school[SchoolTableFields.NAME]
          } schedules, ${school[SchoolTableFields.NAME]} Timetable, ${
            school[SchoolTableFields.NAME]
          } Class times, ${
            school[SchoolTableFields.NAME]
          } Class availability, ${
            school[SchoolTableFields.NAME]
          } Training sessions, ${school[SchoolTableFields.NAME]} programs, ${
            school[SchoolTableFields.NAME]
          } Lesson schedules, ${
            school[SchoolTableFields.NAME]
          } Training classes, ${
            school[SchoolTableFields.NAME]
          } Class calendar, ${school[SchoolTableFields.NAME]} training times, ${
            school[SchoolTableFields.NAME]
          } Training sessions schedule, ${
            school[SchoolTableFields.NAME]
          } Class offerings, ${school[SchoolTableFields.NAME]} class timetable`}
        />
        <title>
          {school[SchoolTableFields.NAME] + " - Schedule" ?? "Unknown Name"} -
          DOJO+
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.scheduleWrapper} ref={scheduleScrollRef}>
        {schedule?.length ? (
          Weekday.map((day, elementKey) => (
            <Element
              itemScope
              itemtype="https://schema.org/DayOfWeek"
              key={elementKey}
              name={day.toLowerCase()}
              id={day.toLowerCase()}
              className={cx({
                [styles.sundaySpaceGap]: day.toLowerCase() === "sunday",
              })}
            >
              <h2 className="m-0 pt-12 px-0 pb-7 text-4xl font-extrabold">
                {day}
              </h2>
              {createDaySchedule(day, schedule)}
            </Element>
          ))
        ) : (
          <span>Schedule not found for this school</span>
        )}
      </div>
    </Page>
  ) : (
    <></>
  );
}