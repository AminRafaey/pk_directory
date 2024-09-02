import { AirtableService } from ".";
import _ from 'lodash';
import { RankTable } from "models/RankModel";
import { MartialArtsTables } from "models/MartialArtsModel";
import { AIRTABLE_BASE_MARTIAL_ARTS, AIRTABLE_BASE_RANK } from "airtable.config";

const rankTableData = AirtableService.base(AIRTABLE_BASE_RANK)(
    RankTable.RANK
);

const martialArtTable = AirtableService.base(AIRTABLE_BASE_MARTIAL_ARTS)(
    MartialArtsTables.RANKS
)

async function getRank(username: string): Promise<any> {
    try {
        const records = await fetchRecordsByUsername(username);
        const martialArtQuery = records.map(extractMartialArtQuery).filter(Boolean);
        const martialArts = await fetchMartialArts(martialArtQuery);
        const response = mergeRecordsAndMartialArts(records, martialArts);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function fetchRecordsByUsername(username: string): Promise<any[]> {
    return rankTableData.select({ filterByFormula: `{Username} = '${username}'` }).all();
}

function extractMartialArtQuery(record: any): string | undefined {
    const martialArtLevel = record.fields['Level (from Martial Arts Ranks)']?.[0];
    return martialArtLevel ? `{Level} = '${martialArtLevel}'` : undefined;
}

async function fetchMartialArts(query: string[]): Promise<any[]> {
    const filterFormula = `OR(${query.join(',')})`;
    return martialArtTable.select({ filterByFormula: filterFormula }).all();
}

function mergeRecordsAndMartialArts(records: any[], martialArts: any[]): any[] {
    return records.map((record) => {
        const martialArtLevel = record.fields['Level (from Martial Arts Ranks)']?.[0];
        const martialArt = martialArts.find((p) => p.fields.Level === martialArtLevel);
        const data = martialArt ? _.mapKeys(martialArt.fields, (v, k) => _.camelCase(k)) : undefined;

        return {
            ..._.mapKeys(record.fields, (v, k) => _.camelCase(k)),
            ...data,
        };
    });
}


export { getRank };