export enum ScheduleTables {
  SCHEDULE = "Schedule",
}

export const Weekday = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export enum ScheduleTableFields {
  INSTRUCTOR = "Instructor Lookup",
  SLUG = "Slug Lookup",
  MARTIAL_ART = "Martial Art Lookup",
  CLASS_NAME = "Class Name",
  ROOM = "Room",
  WEEKDAY = "Weekday",
  START_TIME = "Time Start",
  END_TIME = "Time End",
  // START_TIME = "_Start Time",
  // END_TIME = "_End Time",
}

export enum ScheduleTableViews {
  ALL = "All Schedules",
  API_FIELDS = "Api Fields",
}

export type TimeScheduleTableData = {
  [ScheduleTableFields.INSTRUCTOR]: string[];
  [ScheduleTableFields.SLUG]: string[];
  [ScheduleTableFields.MARTIAL_ART]: string[];
  [ScheduleTableFields.CLASS_NAME]: string;
  [ScheduleTableFields.ROOM]: string;
  [ScheduleTableFields.WEEKDAY]: string;
  [ScheduleTableFields.START_TIME]: string;
  [ScheduleTableFields.END_TIME]: string;
};
