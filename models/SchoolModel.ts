import { AirtableImageEntry } from "./AirtableModel";

export enum SchoolTables {
  SCHOOLS = "Schools",
  SCHOOLS_COPY = "Schools Copy",
  MARTIAL_ARTS = "Martial Arts",
  SCHOOLS_REVIEWS = "Reviews",
  AFFILIATIONS = 'Affiliations',
  CLAIMS = 'Claims',
  CRAWL_SCHOOLS_SMOOTHCOMP = 'CrawlSchools Smoothcomp',
  CRAWL_SCHOOLS_IBJJF = 'CrawlSchools Bjjweb',
}

export enum SchoolTableFields {
  ID = "ID",
  NAME = "School Name",
  SLUG = "Slug",
  SITE = "Website",
  ADDRESS = "Address 1",
  TEAM = "Team",
  PHONE = "Phone",
  MARTIAL_ARTS = "Martial Arts Lookup",
  SLUG_TYPE_MARTIAL_ARTS_LOOKUP = "Slug Type Martial Arts Lookup",
  LOGO = "School Logo",
  GEO = "Geo",
  FULL_ADDRESS = "Full Address",
  LAST_ADDRESS = "Last Address",
  PHONE_TYPE = "Phone Type",
  EMAIL = "Email",
  DESCRIPTION = "Description",
  LAT = "lat",
  LON = "long",
  COUNTRY = 'Country',
  CITY = 'City',
  STATE = 'State',
  LOCATION = 'Location',
  NEIGHBORHOOD = 'Neighborhood',
  RATING = 'Rating (from Reviews)',
  TEAM_LOGO = 'Team Logo',
  AFFILIATION_SCHOOL_NAME = "Name",
  RECORD_ID = "Record ID",
  ALREADY_EXIST = "Already Exist",
  SLUG_TYPE_CITY = "Slug Type City",
  SLUG_TYPE_STATE = "Slug Type State",
  SLUG_TYPE_COUNTRY = "Slug Type Country",
}

export enum SchoolPhoneTypes {
  WHATSAPP = "WhatsApp",
  PHONE = "PHO",
  KAKAO = "KakaoTalk",
  TELEGRAM = "Telegram",
  GVOICE = "Google Voice",
  SKYPE = "Skype",
  SMS = "SMS",
  WECHAT = "WeChat",
}

export enum SchoolTableViews {
  ALL = "All Schools",
  ACTIVE_PAGES = "Active pages",
}

export type SchoolTableFieldsSearch = SchoolTableFields[];

export type SchoolTableData = {
  [SchoolTableFields.SLUG]?: string;
  [SchoolTableFields.NAME]?: string;
  [SchoolTableFields.SITE]?: string;
  [SchoolTableFields.ADDRESS]?: string;
  [SchoolTableFields.PHONE]?: string;
  [SchoolTableFields.FULL_ADDRESS]?: string;
  [SchoolTableFields.TEAM]?: string[];
  [SchoolTableFields.MARTIAL_ARTS]?: string[];
  [SchoolTableFields.LOGO]?: AirtableImageEntry[];
  [SchoolTableFields.PHONE_TYPE]?: SchoolPhoneTypes;
};

// cannot be interface due Next.js typings
export type SchoolSlug = { id: string; slug: string };
