import { AirtableService } from ".";
const puppeteer = require("puppeteer");
import {
    SchoolTables,
} from "models/SchoolModel";
import { formattedResponse } from "src/shared/utils/airtable-utils";
import { AIRTABLE_BASE_SCHOOLS } from "airtable.config";
// for later use
const table = AirtableService.base(AIRTABLE_BASE_SCHOOLS)(
    SchoolTables.SCHOOLS
);

const smoothCompSchoolTable = AirtableService.base(AIRTABLE_BASE_SCHOOLS)(
    SchoolTables.CRAWL_SCHOOLS_SMOOTHCOMP
);
const bjjwebSchoolTable = AirtableService.base(AIRTABLE_BASE_SCHOOLS)(
    SchoolTables.CRAWL_SCHOOLS_IBJJF
);

async function crawlSchoolDetails(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const schoolDetails: any = {};

    // Extract h1 tag 
    const h1Element = await page.$("h1");
    schoolDetails.schoolName = h1Element
        ? await h1Element.evaluate((a) => a.innerText.trim().split(',')[0])
        : null;

    // Extract School logo URL
    const logoElement = await page.$("img");
    schoolDetails.schoolLogoUrl = logoElement
        ? await logoElement.evaluate((img) => img.getAttribute("src"))
        : null;

    // Extract address tag
    const address1LocationElement = await page.$(
        "strong"
    );

    schoolDetails.address1 = address1LocationElement
        ? await address1LocationElement.evaluate((span) => span.innerText.trim())
        : null;

    // Extract  state  city country
    const stateCityLocationElement = await page.$(
        "br + strong"
    );

    schoolDetails.address2 = stateCityLocationElement
        ? await stateCityLocationElement.evaluate((span) => span.innerText.trim())
        : null;
    // Extract Zip Code  from city state

    schoolDetails.locationZipCode = stateCityLocationElement
        ? await stateCityLocationElement.evaluate((span) => span.innerText.split(',')[1].trim())
        : null;

    // Extract State
    schoolDetails.locationState = stateCityLocationElement
        ? await stateCityLocationElement.evaluate((span) => span.innerText.trim().match(/\b([A-Z]{2})\b/)?.[1])
        : null;

    // Extract City
    schoolDetails.locationCity = stateCityLocationElement
        ? await stateCityLocationElement.evaluate((span) => span.innerText.trim().split(' ')[0])
        : null;

    // Select the <strong> element containing "Contact Phone"
    const contactPhoneElement = await page.$x('//strong[contains(text(), "Contact Phone")]/following-sibling::text()[1]');
    if (contactPhoneElement && contactPhoneElement?.length > 0) {
        schoolDetails.contactPhoneElement = await page.evaluate(element => element.textContent.replace(':', '').trim(), contactPhoneElement?.[0])
    } else {
        schoolDetails.contactPhoneElement = null;
    }

    // Instructor Name of school
    const professorNameElement = await page.$x('//strong[contains(text(), "Head Professor")]/following-sibling::text()[1]');
    if (professorNameElement && professorNameElement?.length > 0) {
        schoolDetails.professorNameElement = await page.evaluate(element => element.textContent.replace(':', '').trim(), professorNameElement?.[0])
    } else {
        schoolDetails.professorNameElement = null;
    }

    // Facebook url of school
    const facebookElement = await page.$x('//strong[contains(text(), "Woman Only Program")]/following-sibling::a[1]');
    if (facebookElement && facebookElement.length > 0) {
        schoolDetails.facebookUrl = await page.evaluate(element => element.textContent.trim(), facebookElement?.[0]);
    } else {
        // Handle the case where the element is not found
        schoolDetails.facebookUrl = null;
    }

    // School Email
    const schoolEmailElement = await page.$x('//strong[contains(text(), "Email")]/following-sibling::a[1]');
    if (schoolEmailElement && schoolEmailElement.length > 0) {
        schoolDetails.schoolEmailUrl = await page.evaluate(element => element.textContent.trim(), schoolEmailElement?.[0]);
    } else {
        // Handle the case where the element is not found
        schoolDetails.schoolEmailUrl = null;
    }

    
    // Extract Website url of school
    const websiteElement = await page.$(
        'br + strong + br + strong + br + strong + a'
    );
    schoolDetails.website = websiteElement
        ? await websiteElement.evaluate((a) => a.innerText.trim())
        : null;

    // Extract youTube link of schools 
    const youtubeIframeElement = await page.$('br + iframe');
    schoolDetails.youtubeIframeElement = youtubeIframeElement ? await youtubeIframeElement.evaluate(iframe => iframe.getAttribute('src')) : null;

    // extract school Description
    const schoolDetailElement = await page.$x('//strong[contains(text(), "Details")]/following-sibling::text()[1]');
    if (schoolDetailElement && schoolDetailElement?.length > 0) {
        schoolDetails.schoolDetailElement = await page.evaluate(element => element.textContent.replace(':', '').trim(), schoolDetailElement?.[0])
    } else {
        schoolDetails.schoolDetailElement = null;
    }

    await browser.close();
    return schoolDetails;
}

async function updateCrawlerTableRecordAndAddScrapSchoolInfo(recordId, schoolData) {
    try {
        await smoothCompSchoolTable.update(recordId, {
            Name: schoolData.schoolName,
            'School Logo': schoolData?.schoolLogoUrl,
            'Phone': schoolData?.contactPhoneElement,
            'Address 1': schoolData?.address1,
            'Address 2': schoolData?.address2,
            'Zip': schoolData?.locationZipCode,
            'City': schoolData?.locationCity,
            'State': schoolData?.locationState,
            Description: schoolData?.schoolDetailElement,
            'School Website': schoolData?.website,
            'Facebook Url': schoolData?.facebookUrl,
            'Instructor': schoolData?.professorNameElement,
            'School Email': schoolData?.schoolEmailUrl,
            'YoutubeUrl': schoolData?.youtubeIframeElement,
        });
        console.log(`Record ${recordId} updated successfully.`);
    } catch (error) {
        console.error(`Error updating record ${recordId}:`, error.message);
    }
}



// get All schools link Record from crawler and update records 
async function getAllCrawlSchoolLinkAndUpdateRecord() {
    let query = `{Schools Link}`;

    const records = await bjjwebSchoolTable.select({
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

async function extractSchoolLinkUsingCrawl(url) {
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
                const record = await bjjwebSchoolTable.create({
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
        console.log('Error', error)
    }
}

async function getSchoolInfoAndCreateScrapSchoolData() {
    let query = `{Slug}`

    const crawlerRecords = await bjjwebSchoolTable.select({
        filterByFormula: query,
    }).all();

    const school_records: any = await table.select({
        filterByFormula: query,
    }).all();
    const formattedSchoolsTableResults = formattedResponse(school_records)
    const formattedCrawlerRecords = formattedResponse(crawlerRecords)


    // get record id from school table and add in crawler school table to track record 
    for (let i = 0; i < formattedSchoolsTableResults?.length; i++) {
        const matchingCrawlerRecord = formattedCrawlerRecords.find(crawlerRecord => crawlerRecord?.name === formattedSchoolsTableResults?.[i]?.schoolName);
        console.log('matchingCrawlerRecord', matchingCrawlerRecord);

        if (matchingCrawlerRecord) {
            // If a matching record is found, update the Record ID in the existing field of the crawler record
            const updateRecord = await smoothCompSchoolTable.update(matchingCrawlerRecord.recordId, {
                'Record ID Schools': formattedSchoolsTableResults?.[i]?.recordId,
            });

            console.log('Updated record ID:', updateRecord);
        }
    }


    //  add record from crawler table into main schools table
    // for (let i = 0; i < formattedCrawlerRecords.length; i++) {
    //     if (!formattedCrawlerRecords?.[i].alreadyExist) {
    //         const record = await table.create({
    //             'School Name': formattedCrawlerRecords?.[i]?.name,
    //             'School Logo': [
    //                 {
    //                     url: formattedCrawlerRecords?.[i]?.schoolLogo || '',
    //                 },
    //             ],
    //             'Phone Type': 'Phone',
    //             'Slug': formattedCrawlerRecords?.[i]?.slug,
    //             'Description': formattedCrawlerRecords?.[i]?.description,
    //             'Phone': formattedCrawlerRecords?.[i]?.phone,
    //             'Website': formattedCrawlerRecords?.[i]?.schoolWebsite,
    //             // 'Gallery': [
    //             //     {
    //             //         url: formattedCrawlerRecords?.[i]?.coverImage,
    //             //     },
    //             // ],
    //             'Address 1': formattedCrawlerRecords?.[i]?.fullAddress,
    //             'Address 2': formattedCrawlerRecords?.[i]?.address2,
    //             'City': formattedCrawlerRecords?.[i]?.city,
    //             'State': formattedCrawlerRecords?.[i]?.state,
    //             'Zip': formattedCrawlerRecords?.[i]?.zip,
    //             'Bjjweb Schools Link': formattedCrawlerRecords?.[i]?.schoolsLink,
    //             'YouTube': formattedCrawlerRecords?.[i]?.youtubeUrl,
    //             'Facebook': formattedCrawlerRecords?.[i]?.facebookUrl,
    //             'Email': formattedCrawlerRecords?.[i]?.schoolEmail,

    //         });
    //         console.log('record Create successful', record);
    //     }
    //     else {
    //         console.log('Record not updated');
    //     }
    // }


    // FOR match record with school table and crawler table using Slug for latter use

    // for (const crawlerRecord of formattedCrawlerRecords) {
    //     const crawlerRecordSlug = crawlerRecord.slug;

    //     // Check if the current crawler record's slug exists in formattedSchoolsTableResults
    //     const isSlugExist = formattedSchoolsTableResults.some(result => result.slug === crawlerRecordSlug);

    //     // Update the 'Already Exist' field based on the check
    //     const record = await bjjwebSchoolTable.update(crawlerRecord.recordId, {
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




export { getAllCrawlSchoolLinkAndUpdateRecord, extractSchoolLinkUsingCrawl, crawlSchoolDetails, getSchoolInfoAndCreateScrapSchoolData };
