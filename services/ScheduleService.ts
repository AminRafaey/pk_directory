import { GetStaticProps, InferGetStaticPropsType } from "next";
import { AirtableService } from ".";
import { SchoolSlug } from "models/SchoolModel";
import {
  TimeScheduleTableData,
  ScheduleTableFields,
  ScheduleTableViews,
  ScheduleTables,
} from "models/ScheduleModel";
import { AIRTABLE_BASE_TIMETABLE } from "airtable.config";

const scheduleTable = AirtableService.base(AIRTABLE_BASE_TIMETABLE)(
  ScheduleTables.SCHEDULE
);

export const convertToAmPM = (a: number) => {
  const convertedHours = `${new Date((a || 0) * 1000).getUTCHours()}:${
    new Date((a || 0) * 1000).getUTCMinutes() || "00"
  }`;

  const timeString12hr = new Date(
    "1970-01-01T" +
      `${convertedHours.length === 4 ? "0" : ""}` +
      convertedHours +
      "Z"
  ).toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });

  return timeString12hr;
  // The way it was implemented before when it was using _Start Time
  // const [hour, minute] = a?.split(":") || ["00", "00"];
  // const [h, m] = [parseInt(hour, 10), parseInt(minute, 10)];

  // return h > 12
  //   ? h - 12 + ":" + (m === 0 ? "00" : m) + " PM"
  //   : h + ":" + (m === 0 ? "00" : m) + " AM";
};

export const getScheduleStaticProps: GetStaticProps<
  { schedule: TimeScheduleTableData[] },
  SchoolSlug
> = async ({ params }) => {
  const slug = params?.slug?.toLowerCase();
  try {
    const allSchoolSchedule =
      (await scheduleTable
        .select({
          filterByFormula: `{${ScheduleTableFields.SLUG}} = '${slug}'`,
          view: ScheduleTableViews.API_FIELDS,
        })
        .all()) || [];

    const schedule = allSchoolSchedule
      ?.map<TimeScheduleTableData>(
        (record) =>
          Object.keys(record?.fields)?.reduce(
            (acc, fieldKey) => ({
              ...acc,
              [fieldKey]: record?.get(fieldKey) ?? null,
            }),
            {}
          ) as TimeScheduleTableData
      )
      .sort(
        (a, b) =>
          a?.[ScheduleTableFields.START_TIME as any] -
          b?.[ScheduleTableFields.START_TIME as any]
      )
      .map((record) => ({
        ...record,
        [ScheduleTableFields.START_TIME]: convertToAmPM(
          parseInt(record[ScheduleTableFields.START_TIME])
        ),
        [ScheduleTableFields.END_TIME]: convertToAmPM(
          parseInt(record[ScheduleTableFields.END_TIME])
        ),
      }));

    return {
      props: {
        // use record.get in order to get related tables value
        schedule: schedule || [],
      },
      revalidate: 3600,
    };
  } catch (err) {
    const logMessage = `Schedule for ${slug} not found`;
    console.log(logMessage, err);
  }
};

export type ScheduleStaticProps = InferGetStaticPropsType<
  typeof getScheduleStaticProps
>;
