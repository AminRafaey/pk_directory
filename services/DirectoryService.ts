import { DirectoryTableFields, DirectoryTables } from "models/DirectoryModel";
import { AirtableService } from ".";
import { formattedResponse } from "src/shared/utils/airtable-utils";
import { AIRTABLE_BASE_DIRECOTRY } from "airtable.config";

const faqTable = AirtableService.base(AIRTABLE_BASE_DIRECOTRY)(
    DirectoryTables.FAQ
);
const popularSearchesTable = AirtableService.base(AIRTABLE_BASE_DIRECOTRY)(
    DirectoryTables.POPULAR_SEARCHES
);


async function getFAQ(filterByFormula: string = ""): Promise<any[]> {
    try {
        const allFAQ: any = await faqTable.select({
            filterByFormula,
            fields: [DirectoryTableFields.QUESTION, DirectoryTableFields.ANSWER],
            sort: [{ field: 'Display Order', direction: 'asc' }],
            maxRecords: 6,
        }).all();
        const formattedResponseData = formattedResponse(allFAQ);
        return formattedResponseData
    } catch (error) {
        console.log(error);
    }
}

async function getPopularSearches(filterByFormula: string = ""): Promise<any[]> {
    try {
        const popularSearchesData: any = await popularSearchesTable.select({
            filterByFormula,
            fields: [DirectoryTableFields.TITLE, DirectoryTableFields.LINK],
            sort: [{ field: 'Display Order', direction: 'asc' }],
            maxRecords: 8,
        }).all();
        const formattedResponseData = formattedResponse(popularSearchesData);
        return formattedResponseData
    } catch (error) {
        console.log(error);
    }
}

export { getFAQ, getPopularSearches };