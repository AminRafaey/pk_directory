export const CustomerTableName = "customer_lead";

export enum CustomerTableColumns {
  ID = "id",
  NAME = "name",
  NOTES = "notes",
  PHONE = "phone",
  COUNTRY = "Country",
  EMAIL = "email",
  INTEREST = "interest",
  SCHOOL_SLUG = "school_slug",
}

export interface Customer {
  [CustomerTableColumns.ID]: string;
  [CustomerTableColumns.NAME]: string;
  [CustomerTableColumns.INTEREST]: string;
  [CustomerTableColumns.NOTES]: string;
  [CustomerTableColumns.PHONE]: string;
  // [CustomerTableColumns.COUNTRY]: string;
  [CustomerTableColumns.EMAIL]: string;
  [CustomerTableColumns.SCHOOL_SLUG]: string;
}

export type CustomerCreateResponse = {
  result: boolean;
  error?: any;
};
