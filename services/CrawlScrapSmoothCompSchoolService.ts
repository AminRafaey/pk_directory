import { AirtableService } from ".";
const puppeteer = require("puppeteer");
import {
    SchoolTableFields,
    SchoolTables,
} from "models/SchoolModel";
import { formattedResponse } from "src/shared/utils/airtable-utils";
import { AIRTABLE_BASE_SCHOOLS } from "airtable.config";
// for later use
const table = AirtableService.base(AIRTABLE_BASE_SCHOOLS)(
    SchoolTables.SCHOOLS
);
// for latter use
const copyschooltable = AirtableService.base(AIRTABLE_BASE_SCHOOLS)(
    SchoolTables.SCHOOLS_COPY
);

const crawler = AirtableService.base(AIRTABLE_BASE_SCHOOLS)(
    SchoolTables.CRAWL_SCHOOLS_SMOOTHCOMP
);

async function crawlSchoolDetails(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const schoolDetails: any = {};

    // Extract h1 tag
    const h1Element = await page.$("h1.margin-vertical-sm-16 a");
    schoolDetails.name = h1Element
        ? await h1Element.evaluate((a) => a.innerText.trim())
        : null;
    schoolDetails.url = h1Element
        ? await h1Element.evaluate((a) => a.getAttribute("href").trim())
        : null;

    // Extract logo URL
    const logoElement = await page.$(".logo-wraper.text-center.relative img");
    schoolDetails.logoUrl = logoElement
        ? await logoElement.evaluate((img) => img.getAttribute("src"))
        : null;

    // Extract stats-location tag
    const statsLocationElement = await page.$(
        ".stats-item.stats-location.pull-left.mute-less"
    );
    schoolDetails.location = statsLocationElement
        ? await statsLocationElement.evaluate((span) => span.innerText.trim())
        : null;

    // Extract Location
    const fullLocationElement = await page.$(
        ".pull-left.margin-right-sm-32.clear-xs p"
    );
    schoolDetails.fullLocation = fullLocationElement
        ? await page.evaluate((p) => {
            const span = p.querySelector("span");
            if (span) {
                span.remove(); // Exclude the span content
            }
            return p.innerText.trim();
        }, fullLocationElement)
        : null;

    // Extract Phone number
    const phoneElement = await page.$('a[href^="tel:"]');
    schoolDetails.phone = phoneElement
        ? await phoneElement.evaluate((a) => a.innerText.trim())
        : null;

    // Extract Website
    const websiteElement = await page.$(
        'a[rel="nofollow noopener"][target="_blank"].lowercase'
    );
    schoolDetails.website = websiteElement
        ? await websiteElement.evaluate((a) => a.getAttribute("href").trim())
        : null;

    // Extract affiliation logo and school name
    const affiliationLogoElement = await page.$(
        ".img.pull-left.margin-right-sm-32.margin-right-xs-16 a.color-inherit img"
    );

    schoolDetails.affiliationLogoUrl = affiliationLogoElement
    ? await affiliationLogoElement.evaluate((img) => img.src)
    : null;

    // Extract School name
    const affiliationNameElement = await page.$(
        ".content.pull-left a.color-inherit span.name.font-size-md"
    );

    schoolDetails.affiliationName = affiliationNameElement
        ? await affiliationNameElement.evaluate((span) => span.innerText.trim())
        : null;

    // Extract cover image URL
    const coverImageElement = await page.$(
        ".cover-image.text-center.bg-brand img"
    );
    schoolDetails.coverImageUrl = coverImageElement
        ? await coverImageElement.evaluate((img) => img.src)
        : null;

    // Extract About Information
    const descriptionInformation = await page.$(
        ".pull-left.clear-both.full-width p"
    );
    schoolDetails.descriptionInformation = descriptionInformation
        ? await page.evaluate((p) => {
            const span = p.querySelector("span");
            if (span) {
                span.remove(); // Exclude the span content
            }
            return p.innerText.trim();
        }, descriptionInformation)
        : null;

    await browser.close();
    return schoolDetails;
}

async function updateCrawlerTableRecordAndAddScrapSchoolInfo(recordId, schoolData) {
    try {
        await crawler.update(recordId, {
            Name: schoolData.name,
            'Website Copy Url': schoolData?.url,
            'School Logo': schoolData?.logoUrl,
            'School Location': schoolData?.location,
            'Full School Address': schoolData?.fullLocation,
            Description: schoolData?.descriptionInformation,
            'Affiliation School Logo': schoolData?.affiliationLogoUrl,
            'Phone': schoolData?.phone,
            'School Website': schoolData?.website,
            'Affiliation School Name': schoolData?.affiliationName,
            'Cover Image': schoolData?.coverImageUrl,
        });
        console.log(`Record ${recordId} updated successfully.`);
    } catch (error) {
        console.error(`Error updating record ${recordId}:`, error.message);
    }
}



// get All schools link Record from crawler and update records 
async function getAllCrawlSchoolLinkAndUpdateRecord() {
    let query = `{Schools Link}`;

    const records = await crawler.select({
        filterByFormula: query,
    }).all();

    const formattedResults = formattedResponse(records);

    const schoolsData = [];
    const batchSize = 5;
    const delayBetweenBatches = 2000; // Set the delay time between batches in milliseconds
    const delayWithinBatch = 500; // Set the delay time within a batch in milliseconds

    for (let i = 0; i < formattedResults.length; i += batchSize) {
        const batch = formattedResults.slice(i, i + batchSize);

        for (let j = 0; j < batch.length; j++) {
            const href = batch[j]?.schoolsLink;

            if (j > 0) {
                // Introduce a delay within a batch
                await new Promise(resolve => setTimeout(resolve, delayWithinBatch));
            }

            const schoolData = await crawlSchoolDetails(href);
            schoolsData.push(schoolData);

            // Assuming each schoolsData item has an 'id' property corresponding to the Airtable record ID
            const recordId = batch[j].id;
            await updateCrawlerTableRecordAndAddScrapSchoolInfo(recordId, schoolData);
        }

        if (i + batchSize < formattedResults.length) {
            // Introduce a delay between batches
            await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
        }
    }

    console.log('Schools Data', schoolsData);
    return schoolsData;
}


function makeArrayUnique(arr) {
    // Use a Set to automatically eliminate duplicate values
    const uniqueSet = new Set(arr);

    // Convert the Set back to an array
    const uniqueArray = Array.from(uniqueSet);

    return uniqueArray;
}

async function sendHrefLinkToCrawlSchoolLinks(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const hrefs = [];

    async function extractHrefs() {
        const hrefElements = await page.$$eval('a[jsname="UWckNb"]', (elements) =>
            elements.map((a) => a.getAttribute("href").trim())
        );
        hrefs.push(...hrefElements);
    }

    async function scrollDown() {
        let previousHeight = 0;

        while (true) {
            await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
            await page.waitForTimeout(2000); // Adjust the waiting time based on your page behavior

            const currentHeight = await page.evaluate("document.body.scrollHeight");
            if (currentHeight === previousHeight) {
                break;
            }

            previousHeight = currentHeight;
            await extractHrefs();
        }
    }

    // on Click More Result button for latter use
    async function clickMoreResults() {
        try {
            const moreResultsButton = await page.waitForSelector("a.T7sFge", { timeout: 5000 });

            if (moreResultsButton) {
                await moreResultsButton.click();
                await page.waitForTimeout(3000);
                await extractHrefs();
                return true;
            } else {
                throw new Error("No more results button found.");
            }
        } catch (error) {
            console.error(error.message);
            return false;
        }
    }

    async function performScrollAndClick() {
        while (true) {
            try {
                // Wait for the "More results" button
                const moreResultsButton = await page.waitForSelector("a.T7sFge", { timeout: 5000 });

                if (moreResultsButton) {

                    // Click the "More results" button
                    await moreResultsButton.click();

                    // Wait for the new results to load
                    await page.waitForTimeout(3000);

                    // Execute scroll action inside the browser context
                    await page.evaluate(() => {
                        window.scrollBy(0, window.innerHeight);
                    });

                    // Wait for the scrolling to settle
                    await page.waitForTimeout(3000);
                    // Run the extractHrefs function again to capture new hrefs
                    await extractHrefs();

                } else {
                    console.log('No more results button found. Exiting loop.');
                    break; // Exit the loop if the button is not found
                }
            } catch (error) {
                console.error('Error while performing scroll and click:', error.message);
                break; // Exit the loop on any error
            }
        }
    }

    async function createCrawlSchoolsUrlOnDB() {
        let uniqueUrlArray
        uniqueUrlArray = await makeArrayUnique(hrefs);
        // Batch size
        const batchSize = 10;

        // Create an array to store all records
        let records = [];

        // Process URLs in batches
        for (let i = 0; i < uniqueUrlArray.length; i += batchSize) {
            const batchUrls = uniqueUrlArray.slice(i, i + batchSize);

            // Create an array of promises for each batch
            const apiCalls = batchUrls.map(async (url) => {
                const record = await crawler.create({
                    'Schools Link': url,
                });
                return record;
            });

            // Wait for all promises in the batch to resolve
            const batchRecords = await Promise.all(apiCalls);

            // Concatenate the batch records to the overall records array
            records = records.concat(batchRecords);
        }

    }
    try {

        await extractHrefs();
        await scrollDown();
        await performScrollAndClick();
        await createCrawlSchoolsUrlOnDB();
        await browser.close();
        return hrefs;
    }
    catch (error) {
        console.log('EEERoor', error)
    }
}

async function getSchoolInfoAndCreateScrapSchoolData() {
    let query = `{Slug}`

    const crawlerRecords = await crawler.select({
        filterByFormula: query,
    }).all();

    const school_records: any = await table.select({
        filterByFormula: query,
    }).all();
    const formattedSchoolsTableResults = formattedResponse(school_records)
    const formattedCrawlerRecords = formattedResponse(crawlerRecords)
   
    // get record id from school table and add in crawler school table to track record 
    
    // for (let i = 0; i < formattedSchoolsTableResults?.length; i++) {
    //     const matchingCrawlerRecord = formattedCrawlerRecords.find(crawlerRecord => crawlerRecord?.name === formattedSchoolsTableResults?.[i]?.schoolName);
    
    //     console.log('matchingCrawlerRecordmatchingCrawlerRecord 🙌🙌🙌🙌🙌🙌🙌🙌', matchingCrawlerRecord);
    
    //     if (matchingCrawlerRecord) {
    //         // If a matching record is found, update the Record ID in the existing field of the crawler record
    //         const updateRecord = await crawler.update(matchingCrawlerRecord.recordId, {
    //             'Record ID Schools': formattedSchoolsTableResults?.[i]?.recordId,
    //         });
    
    //         console.log('Updated record ID: 😍😍😍😍😍😍', updateRecord);
    //     }
    // }


    //  add record from crawler table into main schools table
    for (let i = 0; i < formattedCrawlerRecords.length; i++) {
        if (!formattedCrawlerRecords?.[i].alreadyExist) {
            const record = await table.create({
                'School Name': formattedCrawlerRecords?.[i]?.name,
                'School Logo': [
                    {
                        url: formattedCrawlerRecords?.[i]?.schoolLogo,
                    },
                ],
                'Phone Type': 'Phone',
                'Slug': formattedCrawlerRecords?.[i]?.slug,
                'Description': formattedCrawlerRecords?.[i]?.description,
                'Phone': formattedCrawlerRecords?.[i]?.phone,
                'Website': formattedCrawlerRecords?.[i]?.schoolWebsite,
                'Gallery': [
                    {
                        url: formattedCrawlerRecords?.[i]?.coverImage,
                    },
                ],
                'Address 1': formattedCrawlerRecords?.[i]?.fullSchoolAddress,
                'Smoothcomp': formattedCrawlerRecords?.[i]?.websiteCopyUrl,

            });
            console.log('record Create successful', record);
        }
        else {
            console.log('Record not updated');
        }
    }


    // FOR match record with school table and crawler table using Slug for latter use

    // for (const crawlerRecord of formattedCrawlerRecords) {
    //     const crawlerRecordSlug = crawlerRecord.slug;

    //     // Check if the current crawler record's slug exists in formattedSchoolsTableResults
    //     const isSlugExist = formattedSchoolsTableResults.some(result => result.slug === crawlerRecordSlug);

    //     // Update the 'Already Exist' field based on the check
    //     const record = await claim.update(crawlerRecord.recordId, {
    //         'Already Exist': isSlugExist,
    //     });

    //     if (isSlugExist) {
    //         console.log(`Record with slug ${crawlerRecordSlug} already exists`, record);
    //     } else {
    //         console.log(`Record with slug ${crawlerRecordSlug} does not already exist`, record);
    //     }
    // }

    return { originalSchoolData: formattedSchoolsTableResults };
}




export { getAllCrawlSchoolLinkAndUpdateRecord, sendHrefLinkToCrawlSchoolLinks, crawlSchoolDetails, getSchoolInfoAndCreateScrapSchoolData };
