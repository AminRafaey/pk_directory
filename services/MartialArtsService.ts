import { AIRTABLE_BASE_SCHOOLS } from "airtable.config";
import { AirtableService } from ".";
import { MartialArtsStyleData } from "models/MartialArtsModel";
import { SchoolTables } from "models/SchoolModel";

const martialArtsTable = AirtableService.base(
  AIRTABLE_BASE_SCHOOLS
)(SchoolTables.MARTIAL_ARTS);

export async function getMartialArts<F = MartialArtsStyleData>(
  martialArtIds: string[] = new Array()
) {
  try {
    const allMartialArts = (await martialArtsTable.select({}).all()) || [];
    const selectedMartialArts =
      (martialArtIds &&
        allMartialArts.filter(({ id }) => martialArtIds.includes(id))) ||
      [];

    // use record.get in order to get related tables value
    return selectedMartialArts.map<F>(
      (record) =>
        Object.keys(record.fields).reduce(
          (acc, fieldKey) => ({
            ...acc,
            [fieldKey]: record.get(fieldKey) ?? null,
          }),
          {}
        ) as F
    );
  } catch (err) {
    const logMessage = `Martial arts ${martialArtIds?.join(",")} not found`;
    console.log(logMessage, err);
  }
}
